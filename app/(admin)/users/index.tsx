import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { supabase } from "@/src/services/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

const ROLES = ["student", "faculty", "admin"] as const;
type Role = (typeof ROLES)[number];

type UserRecord = {
  id: string;
  full_name: string | null;
  email?: string;
  role: string | null;
  department: string | null;
};

export default function AdminUsers() {
  const { role: currentRole, session } = useAuth();

  if (currentRole !== "admin") {
    return (
      <Screen contentContainerStyle={styles.container}>
        <Card style={styles.formCard}>
          <Text color={COLORS.error} variant="body">
            Access denied. Admin role required.
          </Text>
        </Card>
      </Screen>
    );
  }

  return <AdminUsersPanel session={session} />;
}

const SEED_USERS: UserRecord[] = [
  { id: "seed-s1", full_name: "Rahul Sharma", role: "student", department: "Computer Science" },
  { id: "seed-s2", full_name: "Priya Nair", role: "student", department: "Computer Science" },
  { id: "seed-s3", full_name: "Arjun Patel", role: "student", department: "Electronics" },
  { id: "seed-s4", full_name: "Meera Joshi", role: "student", department: "Mechanical" },
  { id: "seed-s5", full_name: "Kiran Kumar", role: "student", department: "Computer Science" },
  { id: "seed-f1", full_name: "Dr. John Doe", role: "faculty", department: "Computer Science" },
  { id: "seed-f2", full_name: "Dr. Meera Iyer", role: "faculty", department: "Computer Science" },
  { id: "seed-f3", full_name: "Prof. Suresh Babu", role: "faculty", department: "Electronics" },
  { id: "seed-f4", full_name: "Dr. Anita Rao", role: "faculty", department: "Mechanical" },
  { id: "seed-a1", full_name: "Admin User", role: "admin", department: "Administration" },
  { id: "seed-a2", full_name: "Principal Office", role: "admin", department: "Administration" },
];

function AdminUsersPanel({ session }: { session: any }) {
  const [tab, setTab] = useState<Role>("student");
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<Role>("student");
  const [department, setDepartment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editRole, setEditRole] = useState<Role>("student");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, department")
        .eq("role", tab)
        .order("full_name", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers(SEED_USERS.filter((u) => u.role === tab));
      }
    } catch (e) {
      console.error("Fetch users error:", e);
      setUsers(SEED_USERS.filter((u) => u.role === tab));
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation", "Name, email and password are required.");
      return;
    }

    setSubmitting(true);

    try {
      const accessToken = session?.access_token;
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;

      const response = await fetch(
        `${supabaseUrl}/auth/v1/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            apikey: process.env.EXPO_PUBLIC_SUPABASE_KEY!,
          },
          body: JSON.stringify({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName, role: newUserRole },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.msg || "Failed to create user");
      }

      const userId = result.id ?? result.user?.id;

      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          full_name: fullName,
          role: newUserRole,
          department: department || null,
        });
      }

      Alert.alert("Success", `User "${fullName}" created as ${newUserRole}.`);
      setFullName("");
      setEmail("");
      setPassword("");
      setDepartment("");
      fetchUsers();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      Alert.alert("Error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUser = async (userId: string, name: string | null) => {
    Alert.alert(
      "Delete User",
      `Permanently delete ${name ?? "this user"}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const accessToken = session?.access_token;
              const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;

              const response = await fetch(
                `${supabaseUrl}/auth/v1/admin/users/${userId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    apikey: process.env.EXPO_PUBLIC_SUPABASE_KEY!,
                  },
                }
              );

              if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Delete failed");
              }

              await supabase.from("profiles").delete().eq("id", userId);
              Alert.alert("Deleted", `${name ?? "User"} removed.`);
              fetchUsers();
            } catch (error) {
              const msg = error instanceof Error ? error.message : String(error);
              Alert.alert("Error", msg);
            }
          },
        },
      ]
    );
  };

  const openEditRole = (user: UserRecord) => {
    setEditingUser(user);
    setEditRole((user.role as Role) ?? "student");
    setEditModal(true);
  };

  const saveRoleChange = async () => {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: editRole })
        .eq("id", editingUser.id);

      if (error) throw error;

      Alert.alert("Success", `Role updated to ${editRole}.`);
      setEditModal(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      Alert.alert("Error", msg);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">User Management</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Create, edit roles, and manage all users.
        </Text>
      </View>

      {/* Add User Form */}
      <Card style={styles.formCard}>
        <Text variant="innerHeading">Add New User</Text>

        <Input
          label="Full Name"
          onChangeText={setFullName}
          placeholder="John Doe"
          value={fullName}
        />
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="user@example.com"
          value={email}
        />
        <Input
          label="Password"
          onChangeText={setPassword}
          placeholder="Min. 6 characters"
          secureTextEntry
          value={password}
        />
        <Input
          label="Department (optional)"
          onChangeText={setDepartment}
          placeholder="Computer Science"
          value={department}
        />

        <View style={styles.roleSection}>
          <Text color={COLORS.textSecondary} variant="caption">
            Role
          </Text>
          <View style={styles.roleRow}>
            {ROLES.map((r) => (
              <Pressable
                key={r}
                onPress={() => setNewUserRole(r)}
                style={[
                  styles.roleChip,
                  newUserRole === r ? styles.roleChipActive : undefined,
                ]}
              >
                <Text
                  color={newUserRole === r ? COLORS.white : COLORS.textSecondary}
                  variant="caption"
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Button loading={submitting} onPress={addUser} title="Create User" />
      </Card>

      {/* Tabs for viewing users */}
      <View style={styles.tabRow}>
        {ROLES.map((r) => (
          <Pressable
            key={r}
            onPress={() => setTab(r)}
            style={[styles.tab, tab === r ? styles.tabActive : undefined]}
          >
            <Text
              color={tab === r ? COLORS.white : COLORS.textSecondary}
              style={styles.tabText}
              variant="caption"
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}s
            </Text>
          </Pressable>
        ))}
      </View>

      {/* User List */}
      <Card style={styles.listCard}>
        {loading ? (
          <Text color={COLORS.textSecondary} variant="body">
            Loading...
          </Text>
        ) : users.length === 0 ? (
          <Text color={COLORS.textSecondary} variant="body">
            No {tab}s found.
          </Text>
        ) : (
          <View style={styles.userList}>
            {users.map((u) => (
              <View key={u.id} style={styles.userRow}>
                <View style={styles.userInfo}>
                  <Text variant="body">{u.full_name ?? "—"}</Text>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {u.department ?? "No department"} · {u.role}
                  </Text>
                </View>
                <View style={styles.userActions}>
                  <Pressable onPress={() => openEditRole(u)} style={styles.iconBtn}>
                    <MaterialIcons color={COLORS.primary} name="edit" size={20} />
                  </Pressable>
                  <Pressable
                    onPress={() => deleteUser(u.id, u.full_name)}
                    style={styles.iconBtn}
                  >
                    <MaterialIcons color={COLORS.error} name="delete" size={20} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </Card>

      {/* Edit Role Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={editModal}
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text variant="innerHeading">
              Change Role for {editingUser?.full_name ?? "User"}
            </Text>

            <View style={styles.roleRow}>
              {ROLES.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => setEditRole(r)}
                  style={[
                    styles.roleChip,
                    editRole === r ? styles.roleChipActive : undefined,
                  ]}
                >
                  <Text
                    color={editRole === r ? COLORS.white : COLORS.textSecondary}
                    variant="caption"
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Button
                onPress={() => setEditModal(false)}
                title="Cancel"
                variant="secondary"
              />
              <Button onPress={saveRoleChange} title="Save" />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  formCard: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  iconBtn: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.md,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  listCard: {
    gap: SPACING.md,
  },
  modalActions: {
    flexDirection: "row",
    gap: SPACING.md,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    elevation: 10,
    gap: SPACING.lg,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  roleChip: {
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  roleChipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  roleRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  roleSection: {
    gap: SPACING.sm,
  },
  tab: {
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    flex: 1,
    paddingVertical: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  tabRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  tabText: {
    fontFamily: FONT_FAMILY.semiBold,
    textAlign: "center",
  },
  userActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  userInfo: {
    flex: 1,
    gap: SPACING.xs,
  },
  userList: {
    gap: SPACING.sm,
  },
  userRow: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.sm,
    padding: SPACING.md,
  },
});

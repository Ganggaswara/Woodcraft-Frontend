"use client";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  onInvite: () => void;
};

export default function UsersToolbar({ query, setQuery, role, setRole, onInvite }: Props) {
  return (
    <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users"
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
      </select>
      <button onClick={onInvite} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">Invite User</button>
    </div>
  );
}

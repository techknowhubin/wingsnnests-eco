import { motion } from "framer-motion";

interface RoleToggleProps {
  role: "user" | "host";
  onChange: (role: "user" | "host") => void;
}

const RoleToggle = ({ role, onChange }: RoleToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative flex items-center bg-muted/50 rounded-lg p-0.5 border border-border/50">
        <motion.div
          className="absolute top-0.5 bottom-0.5 rounded-md bg-primary"
          style={{ width: "calc(50% - 2px)" }}
          animate={{ x: role === "user" ? 0 : "calc(100% + 2px)" }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
        {(["user", "host"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`relative z-10 px-5 py-2 rounded-md text-xs font-semibold transition-colors ${
              role === key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {key === "user" ? "Traveller" : "Host"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleToggle;

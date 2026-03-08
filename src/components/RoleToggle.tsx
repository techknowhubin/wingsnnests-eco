import { motion } from "framer-motion";
import { User, Home } from "lucide-react";

interface RoleToggleProps {
  role: "user" | "host";
  onChange: (role: "user" | "host") => void;
}

const RoleToggle = ({ role, onChange }: RoleToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative flex items-center bg-muted/60 rounded-full p-1 border border-border">
        {/* Sliding indicator */}
        <motion.div
          layout
          className="absolute top-1 bottom-1 rounded-full bg-primary shadow-md"
          style={{ width: "calc(50% - 4px)" }}
          animate={{ x: role === "user" ? 0 : "calc(100% + 4px)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        <button
          type="button"
          onClick={() => onChange("user")}
          className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            role === "user" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          Traveller
        </button>

        <button
          type="button"
          onClick={() => onChange("host")}
          className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            role === "host" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          Host
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;

import { motion } from "framer-motion";
import { Plane, Building2 } from "lucide-react";

interface RoleToggleProps {
  role: "user" | "host";
  onChange: (role: "user" | "host") => void;
}

const RoleToggle = ({ role, onChange }: RoleToggleProps) => {
  const options = [
    { key: "user" as const, label: "Traveller", icon: Plane, emoji: "✈️" },
    { key: "host" as const, label: "Host", icon: Building2, emoji: "🏡" },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative flex items-center w-full max-w-xs bg-muted/40 backdrop-blur-sm rounded-2xl p-1.5 border border-border/60 shadow-sm">
        {/* Animated sliding pill */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-primary shadow-lg"
          style={{ width: "calc(50% - 6px)" }}
          animate={{
            x: role === "user" ? 0 : "calc(100% + 6px)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />

        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
              role === opt.key
                ? "text-primary-foreground scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-base">{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleToggle;

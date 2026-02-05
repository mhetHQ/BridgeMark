interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  badge: string;
  iconFilled?: boolean;
  delay?: string;
}

function StatCard({ icon, label, value, badge, iconFilled = true, delay = "" }: StatCardProps) {
  return (
    <div className={`group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 dark:from-white/10 light:from-black/10 to-transparent hover:from-primary/50 hover:to-secondary-accent/50 transition-all duration-500 animate-fade-in-up hover-lift ${delay}`}>
      <div className="relative flex flex-col gap-2 sm:gap-3 h-full rounded-2xl bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-xl p-5 sm:p-6 md:p-8 border border-white/5 dark:border-white/5 light:border-black/5 group-hover:border-transparent transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 text-white dark:text-white light:text-gray-900 group-hover:animate-float">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 -960 960 960"
            width="36"
            fill="currentColor"
            style={{
              fontVariationSettings: iconFilled ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            {icon === "verified" && (
              <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
            )}
            {icon === "rocket_launch" && (
              <path d="M226-120q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17Zm160 0q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17Zm160 0q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17Zm160 0q-26 0-43-17t-17-43q0-26 17-43t43-17q26 0 43 17t17 43q0 26-17 43t-43 17ZM206-310q-51-38-78.5-95T100-522q0-122 89-211t211-89q122 0 211 89t89 211q0 60-27.5 117T594-310l-34-34q38-27 59-71.5t21-96.5q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 52 21 96.5t59 71.5l-34 34Z" />
            )}
            {icon === "sentiment_very_satisfied" && (
              <path d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146 272q66 0 121.5-35.5T682-393H278q26 61 81 96.5T480-261Zm0 181q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            )}
          </svg>
        </div>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-xs font-bold uppercase tracking-widest z-10">
          {label}
        </p>
        <div className="flex items-baseline gap-2 sm:gap-3 z-10">
          <p className="text-white dark:text-white light:text-gray-900 text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight">
            {value}
          </p>
          <span className="text-black text-[10px] sm:text-xs font-bold bg-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="w-full py-8 sm:py-12 max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          icon="verified"
          label="Vetted Agencies"
          value="5+"
          badge="+12%"
          delay=""
        />
        <StatCard
          icon="rocket_launch"
          label="Projects Delivered"
          value="10+"
          badge="+25%"
          delay="animation-delay-200"
        />
        <StatCard
          icon="sentiment_very_satisfied"
          label="Client Satisfaction"
          value="98%"
          badge="+5%"
          delay="animation-delay-400"
        />
      </div>
    </section>
  );
}

import styles from "./Panel.module.css";

function Panel(props: {
  variant?: "default" | "variant";
  extra?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  const { variant, extra, children, ...rest } = props;

  const className = [
    styles.panel,
    variant === "default" ? styles.panelDefault : styles.panelVariant,
    rest.darkMode && styles.darkMode,
    extra,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export default Panel;

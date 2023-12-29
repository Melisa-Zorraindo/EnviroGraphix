import { UserPlaceholder } from "../Icons";
import styles from "./avatar.module.scss";

interface AvatarProps {
  picture: string;
  companyName: string;
}

export default function Avatar({
  picture,
  companyName,
}: AvatarProps): JSX.Element {
  return (
    <button className={styles.container}>
      {picture === undefined ? <UserPlaceholder /> : <img></img>}
      <span className={styles.companyName}>{companyName}</span>
      <span className={styles.caret}>&#9660;</span>
    </button>
  );
}

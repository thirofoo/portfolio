export interface AchievementItem {
  period: string;
  icon: string;
  title: JSX.Element | string;
  description: JSX.Element | string;
  link?: string;
}

export interface AchievementGroup {
  label: string;
  items: AchievementItem[];
}

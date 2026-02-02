import { IconBook, IconHome, IconLibrary } from "@tabler/icons-react";

export const navigationItems = [
  { icon: <IconHome size={18} />, label: "Главная", path: "/" },
  { icon: <IconLibrary size={18} />, label: "SCP объекты", path: "scp" },
  { icon: <IconLibrary size={18} />, label: "Категории", path: "categories" },
  { icon: <IconBook size={18} />, label: "Список статей", path: "articles" },
];

import {
  Code,
  Gem,
  Handshake,
  Layers,
  Lightbulb,
  Palette,
  PenTool,
  Smartphone,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Code,
  TrendingUp,
  Smartphone,
  Layers,
  PenTool,
  Lightbulb,
  Handshake,
  Gem,
  Target,
};

export function getServiceIcon(name: string): LucideIcon {
  return iconMap[name] ?? Layers;
}

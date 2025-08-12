import { AlertKind, Icon } from "../types";

import {
  FlagIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

export function getStatusIcon(kind: AlertKind): Icon {
  switch (kind) {
    case 'info':
      return InformationCircleIcon;
    case 'success':
      return CheckCircleIcon;
    case 'warning':
      return ExclamationTriangleIcon;
    case 'danger':
      return ExclamationCircleIcon;
    case 'default':
      return FlagIcon;
    default:
      return InformationCircleIcon;
  }
}

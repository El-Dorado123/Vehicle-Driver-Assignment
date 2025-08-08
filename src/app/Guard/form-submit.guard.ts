import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
  isFormSubmitted: boolean;
}

export const formSubmitGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
) => {
  const dialog = inject(MatDialog)
  if (component.isFormSubmitted || !component.canDeactivate()) {
    return true;
  }
  const dialogRef = dialog.open(ConfirmDialogComponent);
  return dialogRef.afterClosed();
};

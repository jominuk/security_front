export type ListUpdateModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (password: string, memo: string) => void;
};

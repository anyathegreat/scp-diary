import { Modal } from "@mantine/core";

export default function CustomModal({ modalVariant = "desktop", children, ...props }) {
  switch (modalVariant) {
    case "desktop":
      return (
        <Modal centered visibleFrom="sm" {...props}>
          {children}
        </Modal>
      );

    case "mobile":
      return (
        <Modal fullScreen hiddenFrom="sm" {...props}>
          {children}
        </Modal>
      );
  }
}

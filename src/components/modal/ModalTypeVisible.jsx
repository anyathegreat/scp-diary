import { Modal } from "@mantine/core";

export default function ModalTypeVisible({ title, children, typeVisible, open, close }) {
  switch (typeVisible) {
    case "hiddenFrom":
      return (
        <Modal size="lg" hiddenFrom="sm" opened={open} onClose={close} title={title} fullScreen>
          {children}
        </Modal>
      );

    case "visibleFrom":
      return (
        <Modal size="lg" visibleFrom="sm" opened={open} onClose={close} title={title} centered>
          {children}
        </Modal>
      );
  }
}

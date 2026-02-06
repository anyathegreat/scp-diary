import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ModalAdminEditArticle({ article, open, close }) {
  const form = useForm({});

  const handleForm = (value) => {
    console.log(value);
  };

  return (
    <Modal centered size="lg" opened={open} onClose={close} title={`Редакция статьи: ${article.title}`}>
      <form onSubmit={form.onSubmit(handleForm)}></form>
    </Modal>
  );
}

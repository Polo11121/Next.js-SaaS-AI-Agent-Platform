import type { AgentGetByIdOutput } from "@/modules/agents/types";
import {
  createAgentSchema,
  type CreateAgentSchema,
} from "@/modules/agents/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UseAgentFormProps = {
  initialValues?: AgentGetByIdOutput;
  onSuccess?: () => void;
};

export const useAgentForm = ({
  initialValues,
  onSuccess,
}: UseAgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgentMutation = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getById.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
        toast.success("Agent created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const onSubmit = (data: CreateAgentSchema) =>
    createAgentMutation.mutate(data);

  const isEdit = !!initialValues;
  const { isPending } = createAgentMutation;

  return { form, onSubmit, isEdit, isPending };
};

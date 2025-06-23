import { useState } from "react";
import { MeetingGetByIdOutput } from "@/modules/meetings/types";
import {
  createMeetingSchema,
  type CreateMeetingSchema,
} from "@/modules/meetings/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GeneratedAvatar } from "@/components/generated-avatar";

type UseMeetingFormProps = {
  initialValues?: MeetingGetByIdOutput;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const useMeetingForm = ({
  initialValues,
  onSuccess,
}: UseMeetingFormProps) => {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false);
  const [agentsSearch, setAgentsSearch] = useState("");
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEdit = !!initialValues;

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsSearch,
    })
  );

  const createMeetingMutation = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (createdMeeting) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        onSuccess?.();

        if (!isEdit) {
          router.push(`/meetings/${createdMeeting.id}`);
        }

        toast.success("Meeting created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeetingMutation = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getById.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
        toast.success("Meeting updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const onSubmit = (data: CreateMeetingSchema) => {
    if (isEdit) {
      updateMeetingMutation.mutate({ id: initialValues.id, ...data });
    } else {
      createMeetingMutation.mutate(data);
    }
  };

  const toggleNewAgentDialogVisibility = () =>
    setIsNewAgentDialogOpen((prevState) => !prevState);

  const { isPending } = isEdit ? updateMeetingMutation : createMeetingMutation;

  const agentsOptions = (agents.data?.items ?? []).map((agent) => ({
    id: agent.id,
    value: agent.id,
    children: (
      <div className="flex items-center gap-x-2">
        <GeneratedAvatar
          seed={agent.name}
          variant="botttsNeutral"
          className="border size-6"
        />
        <span>{agent.name}</span>
      </div>
    ),
  }));

  return {
    form,
    onSubmit,
    isEdit,
    isPending,
    agentsOptions,
    setAgentsSearch,
    isNewAgentDialogOpen,
    toggleNewAgentDialogVisibility,
  };
};

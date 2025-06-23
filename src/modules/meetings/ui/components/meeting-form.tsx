"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MeetingGetByIdOutput } from "@/modules/meetings/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeetingForm } from "@/modules/meetings/hooks/use-meeting-form";
import { CommandSelect } from "@/modules/meetings/ui/components/command-select";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

type MeetingFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: MeetingGetByIdOutput;
};

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const {
    form,
    onSubmit,
    isEdit,
    isPending,
    agentsOptions,
    setAgentsSearch,
    isNewAgentDialogOpen,
    toggleNewAgentDialogVisibility,
  } = useMeetingForm({
    initialValues,
    onSuccess,
  });

  return (
    <>
      <NewAgentDialog
        open={isNewAgentDialogOpen}
        onOpenChange={toggleNewAgentDialogVisibility}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 'Sales Consultations'"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={agentsOptions}
                    onSelect={field.onChange}
                    onSearch={setAgentsSearch}
                    value={field.value}
                    placeholder="Select and agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={toggleNewAgentDialogVisibility}
                  >
                    Create new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                type="button"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

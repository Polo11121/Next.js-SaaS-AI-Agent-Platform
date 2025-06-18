import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  MoreVerticalIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type AgentIdViewHeaderProps = {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onDelete,
}: AgentIdViewHeaderProps) => (
  <div className="flex items-center justify-between">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-medium text-xl">
            <Link href="/agents">My Agents</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-foreground text-xl font-medium [&_svg]:size-4">
          <ChevronRightIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="font-medium text-xl text-foreground"
          >
            <Link href={`/agents/${agentId}`}>{agentName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <PencilIcon className="size-4 text-black" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <TrashIcon className="size-4 text-black" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

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

type ViewHeaderProps = {
  page: "meetings" | "agents";
  id: string;
  name: string;
  onUpdate: () => void;
  onDelete: () => void;
};

export const ViewHeader = ({
  page,
  id,
  name,
  onUpdate,
  onDelete,
}: ViewHeaderProps) => (
  <div className="flex items-center justify-between">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-medium text-xl">
            <Link href={`/${page}`} className="capitalize">
              my {page}
            </Link>
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
            <Link href={`/${page}/${id}`}>{name}</Link>
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
        <DropdownMenuItem onClick={onUpdate} className="cursor-pointer">
          <PencilIcon className="size-4 text-black" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
          <TrashIcon className="size-4 text-black" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

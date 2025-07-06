import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShad,
} from "@/shadcn/ui/pagination";
import clsx from "clsx";

interface PaginationProps {
  url: string;
  currentPage: number;
  totalPage: number;
  className?: string;
}

const Pagination = ({
  url,
  currentPage,
  totalPage,
  className,
}: PaginationProps) => {
  // Logic to determine pagination sections
  const getPaginationSections = () => {
    const firstSection: number[] = [];
    const secondSection: number[] = [];
    let isShowEllipsis = false;

    if (totalPage <= 7) {
      // If total pages <= 7, show all pages without ellipsis
      for (let i = 1; i <= totalPage; i++) {
        firstSection.push(i);
      }
    } else {
      // Smart pagination logic for more than 7 pages
      if (currentPage <= 4) {
        // Current page is in the beginning
        for (let i = 1; i <= 5; i++) {
          firstSection.push(i);
        }
        if (totalPage > 6) {
          secondSection.push(totalPage);
          isShowEllipsis = true;
        }
      } else if (currentPage >= totalPage - 3) {
        // Current page is near the end
        firstSection.push(1);
        isShowEllipsis = true;
        for (let i = totalPage - 4; i <= totalPage; i++) {
          secondSection.push(i);
        }
      } else {
        // Current page is in the middle
        firstSection.push(1);
        isShowEllipsis = true;
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          secondSection.push(i);
        }
        if (currentPage + 2 < totalPage) {
          isShowEllipsis = true;
        }
        if (currentPage + 2 < totalPage) {
          secondSection.push(totalPage);
        }
      }
    }

    return { firstSection, secondSection, isShowEllipsis };
  };

  const { firstSection, secondSection, isShowEllipsis } =
    getPaginationSections();

  return (
    <PaginationShad className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${url}?page=${currentPage - 1}`}
            className={clsx(
              currentPage === 1 &&
                "pointer-events-none opacity-50 cursor-not-allowed"
            )}
          />
        </PaginationItem>

        {/* First Section */}
        {firstSection.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={`${url}?page=${pageNum}`}
              className={clsx(
                currentPage === pageNum && "bg-primary text-primary-foreground"
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {isShowEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Second Section */}
        {secondSection.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={`${url}?page=${pageNum}`}
              className={clsx(
                currentPage === pageNum && "bg-primary text-primary-foreground"
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`${url}?page=${currentPage + 1}`}
            className={clsx(
              currentPage === totalPage &&
                "pointer-events-none opacity-50 cursor-not-allowed"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShad>
  );
};

export default Pagination;

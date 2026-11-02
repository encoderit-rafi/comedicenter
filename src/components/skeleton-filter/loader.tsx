import { Card } from "../ui/card";

export function UserCardSkeleton() {
  return (
    <Card className="w-full space-y-4 rounded-lg border border-gray-200 p-4 shadow">
      <div className="flex items-center gap-4 p-1">
        <div className="h-[80px] w-[80px] animate-pulse rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </Card>
  );
}

export function UserCardSkeletonList() {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
    </>
  );
}

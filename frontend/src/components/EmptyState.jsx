
import { Link } from "react-router-dom";
import { PackageX } from "lucide-react";

export default function EmptyState({
  icon: Icon = PackageX,
  title = "No items found",
  description = "Try adjusting your filters or search keywords to find what you are looking for.",
  actionText = "Continue Shopping",
  actionHref = "/shop",
  onActionClick,
}) {
  return (
    <section
      className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center"
      aria-labelledby="empty-state-title"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        <Icon
          className="h-8 w-8 stroke-[1.5]"
          aria-hidden="true"
        />
      </div>

      <h2
        id="empty-state-title"
        className="mb-1.5 text-lg font-semibold text-neutral-900"
      >
        {title}
      </h2>

      <p className="mb-6 text-sm leading-6 text-neutral-600">
        {description}
      </p>

      {onActionClick ? (
        <button
          type="button"
          onClick={onActionClick}
          className="inline-flex items-center justify-center rounded bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          {actionText}
        </button>
      ) : (
        <Link
          to={actionHref}
          className="inline-flex items-center justify-center rounded bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          {actionText}
        </Link>
      )}
    </section>
  );
}

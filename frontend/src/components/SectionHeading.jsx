import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({
  title,
  subtitle,
  linkText,
  linkHref,
  centered = false,
  tag
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${centered ? 'text-center max-w-2xl mx-auto' : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4'}`}>
      <div>
        {tag && (
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-2">
            {tag}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900" style={{ textWrap: 'balance' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap self-start sm:self-auto group"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

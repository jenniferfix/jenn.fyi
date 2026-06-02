import React from "react";
import { cn } from "../lib/utils";

export function H1({
	children,
	className,
	...props
}: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-foreground text-4xl font-extrabold tracking-tight text-balance mt-8 mb-4",
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}

export function H2({
	children,
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(
				"scroll-m-20 text-foreground border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-3",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
}
export function H3({
	children,
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight mt-5 mb-2",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
}
export function H4({
	children,
	className,
	...props
}: React.ComponentProps<"h4">) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-2",
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
}

export function H5({
	children,
	className,
	...props
}: React.ComponentProps<"h5">) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-lg font-semibold tracking-tight mt-4 mb-2",
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
}

export function H6({
	children,
	className,
	...props
}: React.ComponentProps<"h6">) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-base font-semibold tracking-tight mt-4 mb-2",
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
}

export function P({
	children,
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}
			{...props}
		>
			{children}
		</p>
	);
}

export function Ol({
	children,
	className,
	...props
}: React.ComponentProps<"ol">) {
	return (
		<ul
			className={cn("pl-6 list-decimal first:[&>li}:mt-3", className)}
			{...props}
		>
			{children}
		</ul>
	);
}

export function Ul({
	children,
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn("pl-6 list-disc first:[&>li]:mt-3", className)}
			{...props}
		>
			{children}
		</ul>
	);
}

export function Li({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li className={cn("", className)} {...props}>
			{children}
		</li>
	);
}

export function Blockquote({
	children,
	className,
	...props
}: React.ComponentProps<"blockquote">) {
	return (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		>
			{children}
		</blockquote>
	);
}

export function Anchor({
	children,
	className,
	...props
}: React.ComponentProps<"a">) {
	return (
		<a
			className={cn(
				"text-blue-600 hover:underline hover:underline-offset-2",
				className,
			)}
			{...props}
		>
			{children}
		</a>
	);
}

export function Em({
	children,
	className,
	...props
}: React.ComponentProps<"em">) {
	return (
		<code className={cn("italic tracking-tighter", className)} {...props}>
			{children}
		</code>
	);
}

export function Strong({
	children,
	className,
	...props
}: React.ComponentProps<"strong">) {
	return (
		<code className={cn("font-bold", className)} {...props}>
			{children}
		</code>
	);
}

export function Pre({
	children,
	className,
	...props
}: React.ComponentProps<"pre">) {
	return (
		<pre
			className={cn(
				"overflow-x-auto bg-muted/60 text-sm font-semibold leading-6 w-full pl-6 pr-4 py-3 mt-4 rounded-lg [&_code]:bg-transparent [&_code]:p-0",
				className,
			)}
			{...props}
		>
			{children}
		</pre>
	);
}
export function InlineCode({
	children,
	className,
	...props
}: React.ComponentProps<"code">) {
	return (
		<code
			className={cn(
				"relative rounded bg-muted/60 px-2 py-[0.2rem] font-code text-sm font-semibold ",
				className,
			)}
			{...props}
		>
			{children}
		</code>
	);
}

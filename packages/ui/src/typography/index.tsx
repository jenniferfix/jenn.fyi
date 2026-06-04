import React from "react";
import { cn } from "../lib/utils";
import { typographyClassNames } from "./class-names";

export function H1({
	children,
	className,
	...props
}: React.ComponentProps<"h1">) {
	return (
		<h1 className={cn(typographyClassNames.h1, className)} {...props}>
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
		<h2 className={cn(typographyClassNames.h2, className)} {...props}>
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
		<h3 className={cn(typographyClassNames.h3, className)} {...props}>
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
		<h4 className={cn(typographyClassNames.h4, className)} {...props}>
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
		<h4 className={cn(typographyClassNames.h5, className)} {...props}>
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
		<h4 className={cn(typographyClassNames.h6, className)} {...props}>
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
		<p className={cn(typographyClassNames.p, className)} {...props}>
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
		<ul className={cn(typographyClassNames.ol, className)} {...props}>
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
		<ul className={cn(typographyClassNames.ul, className)} {...props}>
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
			className={cn(typographyClassNames.blockquote, className)}
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
		<a className={cn(typographyClassNames.anchor, className)} {...props}>
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
		<code className={cn(typographyClassNames.em, className)} {...props}>
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
		<code className={cn(typographyClassNames.strong, className)} {...props}>
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
		<pre className={cn(typographyClassNames.pre, className)} {...props}>
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
		<code className={cn(typographyClassNames.inlineCode, className)} {...props}>
			{children}
		</code>
	);
}

export function Superscript({
	children,
	className,
	...props
}: React.ComponentProps<"sup">) {
	return (
		<sup className={cn(typographyClassNames.superScript, className)} {...props}>
			{children}
		</sup>
	);
}
export function Subscript({
	children,
	className,
	...props
}: React.ComponentProps<"sub">) {
	return (
		<sub className={cn(typographyClassNames.subScript, className)} {...props}>
			{children}
		</sub>
	);
}

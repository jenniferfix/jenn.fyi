import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Button } from "@jenn.fyi/ui/components/button";
import { Checkbox as CheckboxComponent } from "@jenn.fyi/ui/components/checkbox";
import {
	Field as FieldComponent,
	FieldContent,
	FieldDescription as FieldDescriptionComponent,
	FieldError,
	FieldGroup,
	FieldLabel as FieldLabelComponent,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
} from "@jenn.fyi/ui/components/field";
import { Input as InputComponent } from "@jenn.fyi/ui/components/input";
import { PasswordInput } from "@jenn.fyi/ui/components/password-input";
import { Switch as SwitchComponent } from "@jenn.fyi/ui/components/switch";
import { Toggle as ToggleControl } from "@jenn.fyi/ui/components/toggle";
import { WaitButton } from "@jenn.fyi/ui/components/wait-button";
import { cn, getErrorMessage } from "@jenn.fyi/ui/lib/utils";
import {
	type AnyFieldApi,
	createFormHook,
	createFormHookContexts,
	useStore,
} from "@tanstack/react-form";
import * as React from "react";
import { ZodError } from "zod";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "./input-group";
import { Textarea as TextareaComponent } from "./textarea";

const {
	fieldContext,
	formContext,
	useFieldContext: useFormFieldContext,
	useFormContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		Field,
		FieldContent,
		FieldDescription,
		FieldError,
		FieldInfo,
		FieldTitle,
		Label: FieldLabel,
		Checkbox,
		FormLabel,
		FormControl,
		Input,
		Switch,
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
		InputGroupTextarea,
		FormPassword,
		Toggle,
		FieldRowProvider,
		Textarea,
	},
	formComponents: {
		Button,
		FieldGroup,
		FieldLegend,
		FieldSeparator,
		FieldSet,
		FormDescription,
		FormLabel,
		WaitButton,
	},
});

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const useFieldContext = () => {
	const { id } = React.useContext(FormItemContext);
	const { name, store, ...fieldContext } = useFormFieldContext();
	const errors = useStore(store, (state) => state.meta.errors);

	if (!fieldContext) {
		throw new Error("useFieldContext should be used within <FormItem>");
	}

	return {
		id,
		name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		errors,
		store,
		...fieldContext,
	};
};

function FieldRowProvider({ children }: { children: React.ReactNode }) {
	const id = React.useId();
	return <FormItemContext.Provider value={{ id }} children={children} />;
}

function Field({
	className,
	...props
}: React.ComponentProps<typeof FieldComponent>) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<FieldComponent className={cn(className)} {...props} />
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof FieldLabel>) {
	return (
		<FieldLabelComponent
			data-slot="form-label"
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	);
}

function FieldLabel({
	className,
	...props
}: React.ComponentProps<typeof FieldLabelComponent>) {
	const { formItemId } = useFieldContext();

	return (
		<FieldLabelComponent
			className={cn(className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FieldDescription({
	className,
	...props
}: React.ComponentProps<typeof FieldDescriptionComponent>) {
	const { formDescriptionId } = useFieldContext();

	return (
		<FieldDescriptionComponent
			className={cn(className)}
			id={formDescriptionId}
			{...props}
		/>
	);
}

function FormPassword({
	...props
}: React.ComponentProps<typeof PasswordInput>) {
	const { name, errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();
	return (
		<PasswordInput
			name={name}
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function Checkbox(props: React.ComponentProps<typeof CheckboxComponent>) {
	const { errors, formDescriptionId, formMessageId, name, formItemId } =
		useFieldContext();
	return (
		<CheckboxComponent
			name={name}
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function Switch(props: React.ComponentProps<typeof SwitchComponent>) {
	const { errors, formDescriptionId, formMessageId, name, formItemId } =
		useFieldContext();
	return (
		<SwitchComponent
			name={name}
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function Input({ ...props }: React.ComponentProps<typeof InputComponent>) {
	const { name, errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();

	return (
		<InputComponent
			name={name}
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function Textarea({
	...props
}: React.ComponentProps<typeof TextareaComponent>) {
	const { name, errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();

	return (
		<TextareaComponent
			name={name}
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function Toggle({ ...props }: React.ComponentProps<typeof ToggleControl>) {
	const { name, errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();
	return (
		<ToggleControl
			name={name}
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			{...props}
		/>
	);
}

function FormControl({ render, ...props }: useRender.ComponentProps<"div">) {
	const { errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();

	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				id: formItemId,
				"aria-describedby": !errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`,
				"aria-invalid": !!errors.length,
			},
			props,
		),

		render,
		state: {
			slot: "form-control",
		},
	});
}

function FormDescription({
	className,
	...props
}: React.ComponentProps<typeof FieldDescriptionComponent>) {
	return (
		<FieldDescriptionComponent
			data-slot="form-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
	const { errors, formMessageId } = useFieldContext();
	const body = errors.length
		? String(errors.at(0)?.message ?? "")
		: props.children;

	if (!body) return null;

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<ul className="text-sm text-destructive">
					{field.state.meta.errors
						.map((e) => getErrorMessage(e))
						.map((m) => (
							<li key={m}>
								<em>{m}</em>
							</li>
						))}
				</ul>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

export { useAppForm, useFieldContext, useFormContext, withForm };

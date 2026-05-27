import { createContext, memo, useContext, useMemo } from "react";
import { type ContentDataType, contentDataObject } from "@/lib/schema";
import rawData from "../../data/content.json";

export const ContentContext = createContext<ContentDataType | undefined>(
	undefined,
);

export function useContent() {
	const ctx = useContext(ContentContext);
	if (!ctx) {
		throw Error("tried to access context outside of provider");
	}
	return ctx;
}

export interface ContextProviderProps {
	children?: React.ReactNode;
}

export const ContentContextProvider = memo(
	({ children }: ContextProviderProps) => {
		const data = contentDataObject.parse(rawData);

		const context = useMemo<ContentDataType>(
			() => ({
				...data,
			}),
			[data],
		);

		return <ContentContext value={context}>{children}</ContentContext>;
	},
);

import { Column, Html, Row, Section, Tailwind } from "@react-email/components";
import React from "react";

interface EmailTemplateProps {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const EmailTemplate = ({
	name,
	email,
	subject,
	message,
}: Readonly<EmailTemplateProps>): React.ReactElement => {
	return (
		<Tailwind>
			<Html>
				<Section>
					<Row>
						<Column>
							<table>
								<tr className="">
									<td>Subject:</td>
								</tr>
								<tr>
									<td className="font-semibold">{subject}</td>
								</tr>
								<tr>
									<td>From:</td>
									<td className="font-semibold">{name}</td>
								</tr>
								<tr>
									<td>Email:</td>
									<td className="font-semibold">{email}</td>
								</tr>
							</table>
						</Column>
					</Row>
					<Row className="mt-4">
						<Column>{message}</Column>
					</Row>
				</Section>
			</Html>
		</Tailwind>
	);
};

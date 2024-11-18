import { CircleCheck, LoaderIcon, Send } from "lucide-react";
import { ReactNode, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    FullName: z.string().min(1, "Full Name is required"),
    EmailAddress: z.string().email("Invalid email address"),
    PhoneNumbers: z.array(
        z.object({
            number: z.string().regex(/^\d+$/, "Phone number must contain only numbers").max(20, "Phone number cannot exceed 20 characters")
        })
    ),
    Message: z.string().max(500, "Message must be less than 500 characters"),
    bIncludeAddressDetails: z.boolean(),
    AddressDetails: z
        .object({
            AddressLine1: z.string().optional(),
            AddressLine2: z.string().optional(),
            CityTown: z.string().optional(),
            StateCounty: z.string().optional(),
            Postcode: z
                .union([z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, "Invalid postcode: Must be a valid UK postcode"), z.string().length(0)])
                .optional(),
            Country: z.string().optional()
        })
        .optional()
});

type ContactFormInputs = z.infer<typeof schema>;

const FieldLabel = ({ children }: { children: ReactNode }) => <label className="mb-1 block">{children}</label>;

const fieldInputClasses = "w-full rounded border text-gray-800 border-gray-200 bg-gray-50 p-2";

const SuccessMessage = ({ onReset }: { onReset: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-md bg-[#e9f5da] p-6 text-center shadow-md">
            <CircleCheck className="mb-4 h-12 w-12 text-[#8fc73d]" />
            <h2 className="text-lg font-semibold text-gray-800">Your message has been sent</h2>
            <p className="text-sm text-gray-600">We will be in contact with you within 24 hours.</p>
            <button onClick={onReset} className="mt-4 text-sky-600 underline">
                Send another message
            </button>
        </div>
    );
};

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors }
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            FullName: "",
            EmailAddress: "",
            PhoneNumbers: [{ number: "" }],
            Message: "",
            bIncludeAddressDetails: false,
            AddressDetails: {
                AddressLine1: "",
                AddressLine2: "",
                CityTown: "",
                StateCounty: "",
                Postcode: "",
                Country: ""
            }
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "PhoneNumbers"
    });

    const showAddressDetails = watch("bIncludeAddressDetails");

    const [submissionSuccessful, setSubmissionSuccessful] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: ContactFormInputs) => {
        setIsSubmitting(true);
        console.log("Submitting form data:", data);
        setIsSubmitting(false);

        try {
            const response = await fetch("https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error("HTTP error:", response.status);
                console.log("Response:", response);
                setSubmissionSuccessful(false);
                return;
            }

            const result = await response.json();

            if (result.Success) {
                setSubmissionSuccessful(true);
            } else {
                setSubmissionSuccessful(false);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmissionSuccessful(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setSubmissionSuccessful(null);
        reset();
    };

    return (
        <div className="mx-auto flex w-full flex-1 flex-col px-4 sm:w-3/5 md:flex-row md:space-x-6">
            <div className="w-full py-8 text-xs text-gray-700 lg:w-1/2">
                {submissionSuccessful === true ? (
                    <SuccessMessage onReset={handleReset} />
                ) : (
                    <>
                        {submissionSuccessful === false && (
                            <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
                                <p>There was an error submitting the form. Please try again later.</p>
                            </div>
                        )}
                        <h1 className="mb-4 text-xl font-light">Contact Us</h1>
                        <p className="mb-4 text-xs font-medium">
                            Populo facilisi nam no, dolor deleniti deseruisse ne cum, nam quodsi aliquam eligendi ne. Ferri euismod accusata te nec, summo
                            accumsan at vix.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-500">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="flex-1">
                                    <FieldLabel>Full Name</FieldLabel>
                                    <input id="FullName" type="text" {...register("FullName")} className={fieldInputClasses} disabled={isSubmitting} />
                                    {errors.FullName && <p className="text-red-500">{errors.FullName.message}</p>}
                                </div>

                                <div className="flex-1">
                                    <FieldLabel>Email address</FieldLabel>
                                    <input id="EmailAddress" type="email" {...register("EmailAddress")} className={fieldInputClasses} disabled={isSubmitting} />
                                    {errors.EmailAddress && <p className="text-red-500">{errors.EmailAddress.message}</p>}
                                </div>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <FieldLabel>
                                        Phone number 0{index + 1} - <span className="italic text-gray-400">optional</span>
                                    </FieldLabel>
                                    <input
                                        id={`PhoneNumbers.${index}.number`}
                                        type="text"
                                        {...register(`PhoneNumbers.${index}.number`)}
                                        className={fieldInputClasses}
                                        disabled={isSubmitting}
                                    />
                                    {errors.PhoneNumbers?.[index]?.number && <p className="text-red-500">{errors.PhoneNumbers[index].number?.message}</p>}
                                </div>
                            ))}
                            <button
                                type="button"
                                disabled={fields.length > 1 || isSubmitting}
                                onClick={() => append({ number: "" })}
                                className={`mt-2 h-10 w-full rounded px-4 py-2 text-xs font-bold ${
                                    fields.length > 1 || isSubmitting
                                        ? "cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-200"
                                        : "bg-blue-50 text-sky-600 hover:bg-blue-200"
                                }`}
                            >
                                Add new phone number
                            </button>

                            <div>
                                <FieldLabel>
                                    <div className="flex justify-between">
                                        <span>Message</span>
                                        <span className="text-gray-400">Maximum text length is 500 characters.</span>
                                    </div>
                                </FieldLabel>
                                <textarea id="Message" {...register("Message")} className={fieldInputClasses} rows={5} disabled={isSubmitting}></textarea>
                                {errors.Message && <p className="text-red-500">{errors.Message.message}</p>}
                            </div>

                            <div>
                                <label className="flex items-center font-semibold">
                                    <input type="checkbox" {...register("bIncludeAddressDetails")} className="mr-2" disabled={isSubmitting} />
                                    Add address details
                                </label>
                            </div>

                            {showAddressDetails && (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="flex-1">
                                            <FieldLabel>Address Line 1</FieldLabel>
                                            <input
                                                id="AddressLine1"
                                                type="text"
                                                {...register("AddressDetails.AddressLine1")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <FieldLabel>Address Line 2 - optional</FieldLabel>
                                            <input
                                                id="AddressLine2"
                                                type="text"
                                                {...register("AddressDetails.AddressLine2")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div className="flex-1">
                                            <FieldLabel>City/Town</FieldLabel>
                                            <input
                                                id="CityTown"
                                                type="text"
                                                {...register("AddressDetails.CityTown")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <FieldLabel>State/County</FieldLabel>
                                            <input
                                                id="StateCounty"
                                                type="text"
                                                {...register("AddressDetails.StateCounty")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <FieldLabel>Postcode</FieldLabel>
                                            <input
                                                id="Postcode"
                                                type="text"
                                                {...register("AddressDetails.Postcode")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                            {errors.AddressDetails?.Postcode && <p className="text-red-500">{errors.AddressDetails.Postcode.message}</p>}
                                        </div>

                                        <div className="flex-1">
                                            <FieldLabel>Country</FieldLabel>
                                            <input
                                                id="Country"
                                                type="text"
                                                {...register("AddressDetails.Country")}
                                                className={fieldInputClasses}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex h-10 w-full items-center rounded px-4 py-2 font-bold text-white ${
                                    isSubmitting ? "cursor-not-allowed bg-sky-400" : "bg-sky-700 hover:bg-sky-800"
                                }`}
                            >
                                {isSubmitting ? (
                                    <LoaderIcon size={16} className="mr-2 inline-block animate-spin" />
                                ) : (
                                    <Send size={16} className="mr-2 inline-block" />
                                )}
                                <span className="w-full">{isSubmitting ? "Submitting..." : "Submit"}</span>
                            </button>
                        </form>
                    </>
                )}
            </div>

            <div className="hidden items-center justify-center overflow-clip lg:flex lg:w-1/2">
                <img className="-z-10 aspect-auto h-[82vh] max-w-none rotate-90 object-cover" src="./logo700x700.png" alt="Contact Us" />
            </div>
        </div>
    );
}

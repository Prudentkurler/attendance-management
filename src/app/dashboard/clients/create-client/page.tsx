"use client";

// import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import firebase from '../firebase';
import { Form } from "@/components/ui/form";
import { useMultistepForm } from "@/hooks/use-multi-step-form";
import OrganizationInfo from "./organization-info";
import {
  ClientFormSchema,
  initialFormValues,
  validationSchema,
} from "@/schemas/create-client";
import ContactPersons from "./contact-persons";
import CreatePassword from "./create-password";
import ClientInfo from "./client-info";

export default function CreateClientForm() {
  // const router = useRouter();

  // useEffect(() => {
  //   const savedFormData = JSON.parse(localStorage.getItem('createClientForm'));
  //   if (savedFormData) {
  //     setFormValues(savedFormData);
  //   }
  // }, []);

  // };

  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { fields: contactFields } = useFieldArray({
    name: "contact_persons",
    control: form.control,
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ClientInfo
        key="basic-info"
        register={form.register}
        control={form.control}
      />,

      <OrganizationInfo
        key="organization-info"
        register={form.register}
        control={form.control}
      />,

      <ContactPersons
        key="contact-persons"
        register={form.register}
        control={form.control}
        contactFields={contactFields}
      />,
      <CreatePassword
        key="create-password"
        register={form.register}
        control={form.control}
      />,
    ]);

  const onSubmit: SubmitHandler<ClientFormSchema> = async (values) => {
    console.log(values);

    if (!isLastStep) return next();

    // try {
    //   const clientRef = firebase.database().ref('clients').push();
    //   await clientRef.set(values);
    //   setSuccess('Client created successfully');
    //   setSubmitting(false);
    //   localStorage.removeItem('createClientForm');
    //   router.push('/manage-clients');
    // } catch (error) {
    //   setSuccess('Error creating client');
    //   setSubmitting(false);
    // }
  };

  // const saveFormLocally = (values) => {
  //   localStorage.setItem('createClientForm', JSON.stringify(values));
  // };

  return (
    <div className="container mx-auto rounded bg-background p-4">
      {/* <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={handleSubmit} onChange={(values) => saveFormLocally(values)}> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div style={{ position: "absolute", top: ".5rem", left: ".5rem" }}>
            {currentStepIndex + 1} / {steps.length}
          </div>

          <div className="space-y-4">
            {step}

            <div className="flex items-center justify-between">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={back}
                  className="rounded bg-ds-gray px-8 py-1 text-background"
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                onClick={next}
                className="block justify-end rounded bg-ds-primary px-8 py-1 text-ds-foreground"
              >
                {!isLastStep ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

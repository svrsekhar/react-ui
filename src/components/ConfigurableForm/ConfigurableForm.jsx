// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";

const formConfig = [
  {
    name: "username",
    type: "text",
    label: "Name",
    required: true,
  },
  {
    name: "choice",
    type: "radio",
    label: "Select an option",
    required: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  },
];

export default function ConfigurableForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formConfig.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label>{field.label}{field.required && " *"}</label>

          {field.type === "text" && (
            <input
              type="text"
              {...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
              })}
            />
          )}

          {field.type === "radio" &&
            field.options?.map((opt) => (
              <label key={opt.value} style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  value={opt.value}
                  {...register(field.name, {
                    required: field.required
                      ? `Please select ${field.label}`
                      : false,
                  })}
                />
                {opt.label}
              </label>
            ))}
        </div>
      ))}

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/trpc/react";
import { get } from "http";
import { Delete, Plus } from "lucide-react";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

const defaultValues = {};

export default function Page() {
  const { data } = api.post.getUsers.useQuery();
  console.log("data", data);
  return (
    <div className="p-8">
      <h1 className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Crear lead</Button>
          </SheetTrigger>
          <SheetContent className="w-[600px] !max-w-full">
            <SheetHeader>
              <SheetTitle>Crear lead</SheetTitle>
            </SheetHeader>
            <CrearLeadForm />
          </SheetContent>
        </Sheet>
      </h1>
    </div>
  );
}

function CrearLeadForm() {
  const methods = useForm<{
    telefonos: { value: string }[];
    direcciones: { value: string }[];
    nombres: string | undefined;
    apellidos: string | undefined;
    numeroDocumento: string | undefined;
    razonSocial: string | undefined;
    tipoDocumento: "DNI" | "RUC";
  }>({
    defaultValues: {
      telefonos: [{ value: "" }],
      direcciones: [{ value: "" }],
      nombres: undefined,
      apellidos: undefined,
      numeroDocumento: undefined,
      razonSocial: undefined,
      tipoDocumento: "DNI",
    },
  });

  const tipoDocumento = methods.watch("tipoDocumento");

  const onSelectTipoDocumento = (value: string | undefined) => {
    if (value === "DNI" || value === "RUC") {
      methods.reset({
        nombres: undefined,
        apellidos: undefined,
        razonSocial: undefined,
        numeroDocumento: undefined,
      });
      methods.setValue("tipoDocumento", value);
    }
    return;
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 px-8 py-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h1 className="mb-2 font-bold">Datos contacto</h1>
        <Controller
          render={({ field: { onChange, ref, ...field }, fieldState }) => (
            <Select onValueChange={onSelectTipoDocumento} {...field}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipos de documento</SelectLabel>
                  <SelectItem value="DNI">D.N.I.</SelectItem>
                  <SelectItem value="RUC">R.U.C.</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          name="tipoDocumento"
          control={methods.control}
          rules={{ required: true }}
        />

        {tipoDocumento === "DNI" ? (
          <>
            <Label className="flex flex-col gap-2">
              <span>Número de DNI:</span>
              <Input
                {...methods.register("numeroDocumento")}
                key={"numeroDocumentoDNI"}
              />
            </Label>
            <Label className="flex flex-col gap-2">
              <span>Nombres:</span>
              <Input {...methods.register("nombres")} key={"nombres"} />
            </Label>
            <Label className="flex flex-col gap-2">
              Apellidos:
              <Input {...methods.register("apellidos")} key={"apellidos"} />
            </Label>
          </>
        ) : tipoDocumento === "RUC" ? (
          <>
            <Label className="flex flex-col gap-2">
              <span>Número de RUC:</span>
              <Input
                {...methods.register("numeroDocumento")}
                key={"numeroDocumentoRUC"}
              />
            </Label>
            <Label className="flex flex-col gap-2">
              <span>Razón social:</span>
              <Input {...methods.register("razonSocial")} key={"razonSocial"} />
            </Label>
          </>
        ) : null}

        <Separator />

        <FieldArray name="telefonos" label="Teléfonos" type="tel" />
        <FieldArray name="direcciones" label="Direcciones" />

        <Separator />

        <Button type="submit">Crear</Button>
      </form>
    </FormProvider>
  );
}

function FieldArray({
  name,
  label = "",
  type,
}: {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
}) {
  const { control, register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <Label className="flex flex-col gap-2">
      <span>{label}</span>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input {...register(`${name}.${index}.value`)} type={type} />
          <Button
            onClick={() => remove(index)}
            type="button"
            variant="destructive"
            tabIndex={-1}
          >
            <Delete />
          </Button>
        </div>
      ))}
      <Button
        onClick={() => append({ value: "" })}
        type="button"
        variant="secondary"
      >
        <Plus />
        Agregar
      </Button>
    </Label>
  );
}

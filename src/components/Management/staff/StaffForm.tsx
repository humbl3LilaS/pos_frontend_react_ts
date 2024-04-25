import { useToast } from "@/components/ui/use-toast"
import { staffFormConst } from "@/constants/form-constant"
import { useCreateNew } from "@/hook/management/useAddQuery"
import useRenderForm from "@/hook/useRenderForm"

import { Inputs } from "@/type/formSchema"

import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"


const StaffForm = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const formElements = useRenderForm({ formconst: staffFormConst, errors, register, title: "Add new staff" })
    const { mutateAsync } = useCreateNew("staffs")
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await mutateAsync({ formData: data, route: 'staffs' })
        navigate("..")
        toast({ description: "Success added" })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/6 m-auto">
            {formElements}
        </form >
    );
}

export default StaffForm
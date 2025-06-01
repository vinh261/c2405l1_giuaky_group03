import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type typeForm } from "../utils/formSchema";
import AddForm from "../components/ui/add-user/AddForm";
import axios from "../../types/axios";


const AddUser = () => {
    const [ success, setSuccess ] = useState<string | null>(null);
    const [ error , setError ] = useState<string | null>(null);

    const form = useForm<typeForm>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (value: typeForm) => {
        setSuccess(null);
        setError(null);
        console.log("Du lieu gui di: ", value);

        try {
            const response = await axios.post("/api/admin/profile", value);
            console.log("Response AddUser: ", response);
            setSuccess("Thêm thành công");
            form.reset();
        } catch (err) {
            console.error("Lỗi khi gửi dữ liệu: ", err);
            setError("Lỗi khi gửi dữ liệu");
        }
    }

    return (
        <React.Fragment>
            <div className="w-1/2 m-auto bg-white dark:bg-(--item-bg-dark) h-full border border-slate-300 dark:border-slate-700 rounded-xl px-20 py-10">
                {success && <p className="text-green-500">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                <AddForm form={form} onSubmit={onSubmit} />
            </div>
        </React.Fragment>
    )
};

export default AddUser;
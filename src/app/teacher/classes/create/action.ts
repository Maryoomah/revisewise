'use server'
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function createClass(formData : FormData){
const supabase = await createClient ()

const title = formData.get ("title") as string
const description = formData.get ("description") as string
const level = formData.get ("level") as string

const {data: {user}, error} = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login");
  }

const { error: insertError} = await supabase.from("classes")
.insert ({
    title,
    description ,
    level, 
    teacher_id : user.id,
})
  if (insertError) {
    throw insertError;
  }

  redirect("/teacher/classes");

}
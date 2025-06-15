import {useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem, 
  FormLabel,
  FormMessage,
} from "../Form";
import { Input } from "../CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from '../CustomButton';
import { cn } from '../../constants';
import categoryImageMap from '../../../data/data.json'


function TaskForm({
  schema,
  defaultValues,
  onSubmit,
  type
}) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,

  }); 
  
  const handleSubmit = async (data) => {
    // console.log("FORM DATA", data);
    // Find category name from the selected image URL
  const categoryEntry = Object.keys(categoryImageMap).find(
    // ([_, url]) => url === data.imageUrl
        key => categoryImageMap[key] === data.imageUrl
  );

  const category = categoryEntry ? categoryEntry[0] : "Uncategorized";

  const finalData = {
    ...data,
    category,
  };

    // const result = await onSubmit(data);
    const result = await onSubmit(finalData);
    if (result.success) {
      navigate("/home");
    } else {
      console.error(result.error);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
       TaskForm
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
            {
            ["title", "description"].map((fieldName) => (
                <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="capitalize">{fieldName}</FormLabel>
                    <FormControl>    
                     <Input
                      required
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder={`Enter ${fieldName}`}
                      />                 
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            ))}

            <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Category</FormLabel>
                      <FormControl>
                        <select
                          name={field.name}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          className="w-full rounded p-2 border text-black"
                          required
                        >
                          <option value="">Select a category</option>
                          {Object.entries(categoryImageMap).map(([category, url]) => (
                            <option key={category} value={url}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </FormControl>

                        {form.watch("imageUrl") && (
                          <img
                            src={form.watch("imageUrl")}
                            alt="Selected category"
                            className="w-40 h-32 object-cover mt-4 rounded border shadow"
                          />
                        )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <select
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          className="w-full rounded p-2 border text-black"
                          required
                        >
                          <option value="">Select Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            className="w-full rounded p-2 border text-black"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          <button type="submit" 
          // className='form-btn bg-blue-500 hover:bg-blue-600 w-20 rounded'
          className={cn(`form-btn ${buttonVariants({variant :''})}`)}
          >
            {type === "EDIT_TASK" ? "Edit Task" : "Add Task"}
          </button>
        </form>
      </Form>

    </div>
  );
};
export default TaskForm;
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from "../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";

type contactData = {
  full_name: string;
  email: string;
  contact_phone: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<contactData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<contactData> = async (data) => {
    try {
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdFQ2NpA1z6cqN0NgmxJj0Wz7ofJaYOu3D9OP0NYgizwk5bRw/formResponse"; // Replace with your Google Form action URL
      const formData = new FormData();
      formData.append("entry.1313167338", data.full_name); // Replace with your entry ID for full_name
      formData.append("entry.664158890", data.email); // Replace with your entry ID for email
      formData.append("entry.1934640499", data.contact_phone); // Replace with your entry ID for contact_phone
      formData.append("entry.363068884", data.message); // Replace with your entry ID for message

      console.log("Form Data:", formData);

      await fetch(formUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      // Navigate to the ContactSuccess page after form submission
      toast.success("Message sent successfully");
      navigate('/contactSuccess');
    } catch (error) {
      console.log('Error sending the message', error);
      toast.error('Message sending failed');
    }
  };

  return (
    <>
      <Toaster toastOptions={{
        classNames: {
          error: 'bg-red-400',
          success: 'text-green-400',
          warning: 'text-yellow-400',
          info: 'bg-blue-400',
        },
      }}
      />
      <Navbar />
      <div className="mx-auto flex flex-col container min-h-[620px] items-center">
        <h1 className="font-bold text-3xl m-auto">Contact us today for any queries</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
          <label htmlFor="full_name">Full Name</label>
          {errors.full_name && <p className='text-red-600'>{errors.full_name.message}</p>}
          <input type="text" placeholder="John Doe" className="border-2 border-black rounded-md p-2" {...register("full_name", { required: "Full name is required" })} />

          <label htmlFor="email">Email</label>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          <input type="email" placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2" {...register("email", { required: "Email is required" })} />

          <label htmlFor="contact_phone">Contact Phone</label>
          {errors.contact_phone && <p className='text-red-600'>{errors.contact_phone.message}</p>}
          <input type="text" className="border-2 border-black rounded-md p-2" {...register("contact_phone", { required: "Contact phone is required" })} />

          <label htmlFor="message">Comment or Message</label>
          <textarea className="border-2 border-black rounded-md p-2 w-30 h-20" {...register("message", { required: "Message is required" })}></textarea>

          <button type="submit" className="rounded-md bg-blue-400 p-2">
            Submit
          </button>
          <button type="button" className="rounded-md bg-blue-400 p-2" onClick={() => navigate('/')}>
            Go back
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
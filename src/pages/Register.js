import RegisterForm from '../components/forms/RegisterForm'

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto">
      <p className="mt-10 mb-10 text-[1.5rem] font-bold text-center text-[#0A236D] font-inter italic">
        One account, endless rental possibilities
      </p>

      <div className="w-full bg-white rounded-lg shadow border border-[#3D4083] md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0A236D] md:text-2xl">
            Create an account
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

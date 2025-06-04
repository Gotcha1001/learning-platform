import MinimalSmoke from '@/app/components/SmokeEffects/MinimalSmoke'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="p-3 flex justify-center items-center gradient-background2 h-screen">
            <MinimalSmoke />
            <SignUp />
        </div>
    )
}
'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { CalendarIcon, PersonStandingIcon } from 'lucide-react'
import Link from 'next/link'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'

const accountTypeSchema = z.object({
  accountType: z.enum(['personal', 'company'], { required_error: 'You must select an account type.' }),
  companyName: z.string().optional(),
  numberOfEmployees: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
  if (data.accountType === "company" && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyName"],
      message: "Company name is required"
    })
  }
  if (data.accountType === "company" && (!data.numberOfEmployees || +data.numberOfEmployees < 1)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["numberOfEmployees"],
      message: "Number of employees is required"
    })
  }
})

const passwordSchema = z.object({
  password: z.string({ required_error: 'Password is required' })
    .min(8, 'Password must contain at least 8 characters.')
    .refine((password) => {
      /* must contains at least 1 special character and 1 uppercase letter */
      return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?~`\-=\[\]\\;',./"]).*$/.test(password)
    }, "Password must contain at least 1 special character and 1 uppercase letter."),
  passwordConfirm: z.string()
}).superRefine((data, ctx) => {
  if (!data.passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordConfirm"],
      message: "Confirm Password is required"
    })
  }
  if (data.password !== data.passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordConfirm"],
      message: "Passwords doesn't match"
    })
  }
})

const baseSchema = z.object({
  email: z.string().email({ message: 'Please enter valid email address.' }),
  dob: z.date({ required_error: 'Date of birth is required.' })
    .refine((date) => {
      const today = new Date()
      const eightTeenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      )
      return date <= eightTeenYearsAgo
    }, 'You must be at least 18 years old.'),
  acceptTerms: z.boolean({
    required_error: "You must accept the terms and conditions."
  }).refine(checked => checked === true, "You must accept the terms and conditions.")
})

const formSchema = baseSchema.and(passwordSchema).and(accountTypeSchema)

export default function SignupPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      accountType: undefined,
      companyName: '',
      numberOfEmployees: undefined,
      dob: undefined,
      password: '',
      passwordConfirm: '',
      acceptTerms: undefined,
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('sign-up validation passed: ', data)
    router.push('/dashboard')
  }

  const accountType = form.watch('accountType')
  const dobFromDate = new Date()
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120)

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Sign-up to create SupportMe account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='flex flex-col gap-4 w-full'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='hello@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name='accountType'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an account type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              {accountType === 'company' &&
                <>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Your company name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <FormField
                    control={form.control}
                    name='numberOfEmployees'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={0}
                            placeholder='Your number of employees'
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </>
              }
              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormDescription>
                      Date of birth is used to calculate your age.
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant='outline'
                            className={cn(
                              'font-normal normal-case justify-between cursor-pointer',
                              form.getFieldState('dob').error && 'border-destructive')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='start' className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          captionLayout='dropdown-buttons'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='********' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='********' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I accept the terms and conditions</FormLabel>
                    </div>
                    <FormMessage />
                    <FormDescription>
                      By signing up you agreed to our &nbsp;
                      <Link className='text-primary hover:underline' href="/terms">
                        terms and conditions
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type='submit'>Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-between'>
          <small>Already have an account?</small>
          <Button asChild variant='outline' size='sm'>
            <Link href='login'>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )

}
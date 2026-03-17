import { z } from 'zod';
export declare const PartnerRecipientSchema: z.ZodObject<{
    company: z.ZodObject<{
        legal_name: z.ZodString;
        trade_name: z.ZodString;
        email: z.ZodString;
        cnpj: z.ZodString;
        site_url: z.ZodOptional<z.ZodString>;
        annual_revenue: z.ZodOptional<z.ZodNumber>;
        opening_date: z.ZodOptional<z.ZodString>;
        cnae: z.ZodOptional<z.ZodString>;
        address: z.ZodObject<{
            street: z.ZodString;
            street_number: z.ZodString;
            neighborhood: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            zip_code: z.ZodString;
            complementary: z.ZodOptional<z.ZodString>;
            reference_point: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        }, {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        }>;
        phone: z.ZodObject<{
            ddd: z.ZodString;
            number: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<["mobile", "landline"]>>;
        }, "strip", z.ZodTypeAny, {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        }, {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        legal_name: string;
        trade_name: string;
        cnpj: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        site_url?: string | undefined;
        annual_revenue?: number | undefined;
        opening_date?: string | undefined;
        cnae?: string | undefined;
    }, {
        email: string;
        legal_name: string;
        trade_name: string;
        cnpj: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        site_url?: string | undefined;
        annual_revenue?: number | undefined;
        opening_date?: string | undefined;
        cnae?: string | undefined;
    }>;
    representative: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        cpf: z.ZodString;
        mother_name: z.ZodString;
        birthdate: z.ZodString;
        monthly_income: z.ZodOptional<z.ZodNumber>;
        professional_occupation: z.ZodString;
        address: z.ZodObject<{
            street: z.ZodString;
            street_number: z.ZodString;
            neighborhood: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            zip_code: z.ZodString;
            complementary: z.ZodOptional<z.ZodString>;
            reference_point: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        }, {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        }>;
        phone: z.ZodObject<{
            ddd: z.ZodString;
            number: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<["mobile", "landline"]>>;
        }, "strip", z.ZodTypeAny, {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        }, {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
        cpf: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        mother_name: string;
        birthdate: string;
        professional_occupation: string;
        monthly_income?: number | undefined;
    }, {
        email: string;
        name: string;
        cpf: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        mother_name: string;
        birthdate: string;
        professional_occupation: string;
        monthly_income?: number | undefined;
    }>;
    bank_account: z.ZodObject<{
        holder_name: z.ZodString;
        bank: z.ZodString;
        branch_number: z.ZodString;
        branch_check_digit: z.ZodOptional<z.ZodString>;
        account_number: z.ZodString;
        account_check_digit: z.ZodString;
        type: z.ZodEnum<["checking", "savings"]>;
    }, "strip", z.ZodTypeAny, {
        type: "checking" | "savings";
        holder_name: string;
        bank: string;
        branch_number: string;
        account_number: string;
        account_check_digit: string;
        branch_check_digit?: string | undefined;
    }, {
        type: "checking" | "savings";
        holder_name: string;
        bank: string;
        branch_number: string;
        account_number: string;
        account_check_digit: string;
        branch_check_digit?: string | undefined;
    }>;
    code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    company: {
        email: string;
        legal_name: string;
        trade_name: string;
        cnpj: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        site_url?: string | undefined;
        annual_revenue?: number | undefined;
        opening_date?: string | undefined;
        cnae?: string | undefined;
    };
    representative: {
        email: string;
        name: string;
        cpf: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        mother_name: string;
        birthdate: string;
        professional_occupation: string;
        monthly_income?: number | undefined;
    };
    bank_account: {
        type: "checking" | "savings";
        holder_name: string;
        bank: string;
        branch_number: string;
        account_number: string;
        account_check_digit: string;
        branch_check_digit?: string | undefined;
    };
    code?: string | undefined;
}, {
    company: {
        email: string;
        legal_name: string;
        trade_name: string;
        cnpj: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        site_url?: string | undefined;
        annual_revenue?: number | undefined;
        opening_date?: string | undefined;
        cnae?: string | undefined;
    };
    representative: {
        email: string;
        name: string;
        cpf: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
            complementary?: string | undefined;
            reference_point?: string | undefined;
        };
        phone: {
            number: string;
            ddd: string;
            type?: "mobile" | "landline" | undefined;
        };
        mother_name: string;
        birthdate: string;
        professional_occupation: string;
        monthly_income?: number | undefined;
    };
    bank_account: {
        type: "checking" | "savings";
        holder_name: string;
        bank: string;
        branch_number: string;
        account_number: string;
        account_check_digit: string;
        branch_check_digit?: string | undefined;
    };
    code?: string | undefined;
}>;
export type PartnerRecipientInput = z.infer<typeof PartnerRecipientSchema>;

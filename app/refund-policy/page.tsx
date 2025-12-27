import React from 'react'

export const metadata = {
    title: 'Refund Policy - Aitoonic',
    description: 'Refund policy for paid submissions on Aitoonic AI Directory.',
}

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Refund Policy</h1>

            <div className="prose prose-lg dark:prose-invert">
                <p className="lead">
                    Thank you for choosing Aitoonic to promote your AI tool. Please read our refund policy carefully before making a purchase.
                </p>

                <h3>1. General Policy</h3>
                <p>
                    All purchases for listing plans (Basic, Pro, Featured) are generally non-refundable.
                    By making a payment, you acknowledge that you are purchasing a digital service (listing review and publication quota).
                </p>

                <h3>2. Unused Credits</h3>
                <p>
                    If you have purchased a plan but have <strong>not yet submitted a tool</strong>, you may request a refund within 7 days of purchase.
                    Once a submission has been made using the credit, the service is considered "consumed" regardless of the approval status.
                </p>

                <h3>3. Approved Submissions</h3>
                <p className="font-bold text-red-500">
                    Strictly NO REFUNDS will be issued for submissions that have been approved and published on the directory.
                </p>
                <p>
                    The value of our service lies in the review process, hosting, and exposure provided. Once published, this value has been delivered.
                </p>

                <h3>4. Rejected Submissions</h3>
                <p>
                    If your tool is rejected by our editorial team for not meeting our quality standards, a credit refund will be issued to your account balance automatically.
                    Monetary refunds for rejected submissions are handled on a case-by-case basis.
                </p>

                <h3>5. Contact Us</h3>
                <p>
                    If you believe you have a special case warranting a refund, please contact us at support@aitoonic.com with your Transaction ID and email address.
                </p>
            </div>
        </div>
    )
}

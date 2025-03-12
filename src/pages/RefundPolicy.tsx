
import React from 'react';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none">
          <p>At ZUREE DISEÑO, we want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for returns, exchanges, and refunds.</p>
          
          <h2>1. Return Period</h2>
          <p>1.1 You may return eligible items within 7 days from the date of delivery.</p>
          <p>1.2 To be eligible for a return, your item must be in the same condition that you received it, unworn, unwashed, with all tags attached, and in the original packaging.</p>
          
          <h2>2. Return Process</h2>
          <p>2.1 To initiate a return, please contact our customer service team at returns@zuree.com with your order number and reason for return.</p>
          <p>2.2 After receiving your return request, we will provide you with instructions on how to return the item.</p>
          <p>2.3 You are responsible for the cost of return shipping unless the item was received damaged or we sent you an incorrect item.</p>
          
          <h2>3. Refunds</h2>
          <p>3.1 Once we receive and inspect the returned item, we will notify you about the status of your refund.</p>
          <p>3.2 If your return is approved, we will initiate a refund to your original method of payment.</p>
          <p>3.3 Refunds typically take 5-7 business days to appear in your account, depending on your financial institution.</p>
          <p>3.4 Shipping costs are non-refundable unless you received a damaged or incorrect item.</p>
          
          <h2>4. Exchanges</h2>
          <p>4.1 If you need to exchange an item for a different size or color, please follow the return process and place a new order for the desired item.</p>
          <p>4.2 Exchanges are subject to product availability.</p>
          
          <h2>5. Damaged or Defective Items</h2>
          <p>5.1 If you receive a damaged or defective item, please contact our customer service team within 48 hours of delivery.</p>
          <p>5.2 Please provide photographs of the damaged or defective item to expedite the process.</p>
          <p>5.3 We will arrange for a return and provide a full refund or replacement at no additional cost to you.</p>
          
          <h2>6. Sale Items</h2>
          <p>6.1 Items purchased during sales or promotions are eligible for returns unless otherwise stated at the time of purchase.</p>
          
          <h2>7. Non-Returnable Items</h2>
          <p>7.1 Certain items cannot be returned, including:</p>
          <ul>
            <li>Personalized or custom-made items</li>
            <li>Intimate apparel for hygiene reasons</li>
            <li>Items marked as "Final Sale"</li>
            <li>Gift cards</li>
          </ul>
          
          <h2>8. Late or Missing Refunds</h2>
          <p>8.1 If you haven't received your refund within 10 business days of our confirmation, please check your bank account first.</p>
          <p>8.2 Then contact your credit card company or bank as it may take some time for the refund to be officially posted.</p>
          <p>8.3 If you've done all of this and still have not received your refund, please contact our customer service team.</p>
          
          <h2>9. Changes to This Policy</h2>
          <p>9.1 We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website.</p>
          
          <h2>10. Contact Us</h2>
          <p>10.1 If you have any questions about our Refund Policy, please contact us at returns@zuree.com.</p>
          
          <p className="mt-8 text-sm">Last updated: June 2023</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RefundPolicy;

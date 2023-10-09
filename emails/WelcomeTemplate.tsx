import React from "react";
import { Html, Body, Container, Text, Link, Preview, Tailwind } from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
   return (
      <Html>
         <Preview>Welcome!</Preview>
         <Tailwind>
            <Body className="bg-white">
               <Container>
                  <Text>Hello {name}</Text>
                  <Link href="https://ariodhanu.com">ariodhanu.com</Link>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   );
};

export default WelcomeTemplate;

// components/landing_page_body.tsx
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import Image from "next/image";
import { LoginBtn } from "@/app/_components/login_btn";

export const LandingPageBody = async (params: { dict: Dictionary }) => {
  return (
    <main
      className={css({
        paddingTop: "4.4rem",
		  height: "100%",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          margin: "0 calc(50% - 50vw)",
          bg: "stone.300",
		  height: "100%",
        })}
      >
        <div className={div2Style()}>
          <section
            className={css({
              fontWeight: "700",
              fontSize: "2rem",
              lineHeight: "1",
              alignSelf: "center",
              width: "100%",
              md: { width: "50%" },
            })}
          >
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                })}
              >
                <h2
                  className={css({
                    width: "100%",
                    paddingBottom: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    sm: { fontSize: "1.8rem" },
                    md: { fontSize: "2rem" },
                    lg: { fontSize: "2.2rem" },
                  })}
                >
                  {params.dict.lp_text1}
                  <br />
                </h2>
                <div
                  className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
					gap: "1rem",
                    margin: "0 0 1rem 0",
                  })}
                >
                  <LoginBtn text={params.dict.login} colorVariant="primary"/>
                  <LoginBtn text={params.dict.signin}  colorVariant="secondary"/>
                </div>
              </div>
            </section>
          <div
            className={css({
              display: "flex",
              height: "50%",
			  justifyContent: "center",
			  alignItems: "center",
              width: "0%",
              md: { width: "50%" },
            })}
          >
            <Image
              src="/lowpoly_whiz.png"
              alt="LowPoly Mage Image"
              width="400"
              height="400"
              className={css({
                display: "none",
                md: { display: "block" },
              })}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const div2Style = cva({
  base: {
    width: "100%",
    display: "flex",
	justifyContent: "center",
	alignItems: "center",
    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});

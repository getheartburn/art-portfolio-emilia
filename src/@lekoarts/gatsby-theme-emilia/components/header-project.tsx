/** @jsx jsx */
import * as React from "react"
import { Flex, jsx, Container, Heading } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import { animated, useSpring, config } from "react-spring"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import useEmiliaConfig from "@lekoarts/gatsby-theme-emilia/src/hooks/use-emilia-config"
import HeaderBackground from "./header-background"
import Svg from "./svg"

type HeaderProjectProps = {
  title: string
  areas: string[]
  description?: string
  date: string
}

type AvatarStaticQuery = {
  file: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const HeaderProject = ({ title, areas, description = ``, date }: HeaderProjectProps) => {
  const { name } = useEmiliaConfig()

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const backButtonProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Flex as="header" variant="layout.header">
      <HeaderBackground />
      <Container sx={{ textAlign: `center`, my: 4, zIndex: 10 }}>
        <animated.div style={backButtonProps}>
          <Link
            to="/"
            aria-label={`${name} - Back to homepage`}
            sx={{
              display: `flex`,
              alignItems: `center`,
              color: `text`,
              textDecoration: `none`,
              svg: {
                transition: `transform 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
                mr: 2
              },
              "&:hover, &:focus": { svg: { transform: `translateX(-6px)` } },
            }}
          >
            <Svg id="leftArrow" width="20" height="18" />
            {` `}
            <span sx={{ fontWeight: `medium` }}>{name}</span>
          </Link>
        </animated.div>
        <div sx={{ mt: 4, mb: [6, 6, 7] }}>
          <animated.div style={titleProps}>
            <Heading as="h1" variant="styles.h1">
              {title}
            </Heading>
          </animated.div>
          <animated.div style={infoProps}>
            <div>
              {areas.map((area, index) => (
                <React.Fragment key={area}>
                  {index > 0}
                  {area} <br />
                </React.Fragment>
              ))}
            </div>
            {description && (
              <div sx={{ maxWidth: `900px`, mx: `auto`, mt: 5, p: { textAlign: `center`, overflowWrap: `break-word` } }}>
                {description}
              </div>
            )}
          </animated.div>
        </div>
      </Container>
    </Flex>
  )
}

export default HeaderProject
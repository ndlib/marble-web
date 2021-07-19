/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Heading, Divider } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import typy from 'typy'

const Page = ({ data, location }) => {
  const { menusJson } = data
  const menu = typy(menusJson, 'items').safeArray
  const sx = {
    '& .detail': {
      mb: '2rem',
    },
    '& .name h3': {
      mb: '.25rem',
    },
    '& .name em': {
      display: 'block',
    },
  }
  return (
    <Layout
      title='People'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='People'
      />
      <NDBrandSectionLeftNav>
        <NDBrandSection variant='sidebar'>
          <Menu location={location} variant='navLeft' items={menu} label={menusJson.label} />
        </NDBrandSection>
        <NDBrandSection variant='defaultWithSidebar'>
          <NDBrandBreadcrumbs
            currentPageTitle='People'
            breadcrumbs={[{ url: '/help', title: 'Help' }]}
          />

          <Heading as='h1' variant='pageTitle'>People</Heading>

          <div sx={sx} className='cell large-10'>
            <section id='lead' data-magellan-target='lead'>
              <Heading as='h2' variant='styles.h2'>Leadership</Heading>
              <div className='person'>
                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Diane Walker </Heading>
                    <em>Edward H. Arnold University Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Diane Parr Walker serves as the Principal Investigator on the grant project for the Hesburgh Libraries. She was appointed the Edward H. Arnold University Librarian at the University of Notre Dame in 2011. Her leadership and vision for the libraries is grounded in her abiding commitment to supporting the academic and research goals of the University. Through her leadership, she has clarified that the mission of the Hesburgh Libraries is, and always has been, to connect people to knowledge. The goals of this project directly fulfill this mission on the Notre Dame campus and beyond.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Ann Knoll </Heading>
                    <em>Associate Director
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Ann M. Knoll is the Associate Director of the Snite Museum of Art and co-Principal Investigator on the grant project. Her responsibilities include supervising the museum staff members who perform the accounting, marketing, collections management, and exhibition functions. She is also the museum liaison to the University’s security and safety, building services, and facility maintenance units. Ann has written many successful grant applications and served on state grant review panels.
                  </p>
                </div>
              </div>
              <Divider />
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Tracy Bergstrom </Heading>
                    <em>Director, Specialized Collection Services Program
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Tracy is the Director of the Specialized Collection Services Program within the Hesburgh Libraries of Notre Dame. As such, she oversees Rare Books and Special Collections, University Archives, Preservation, and Digital Production. Tracy serves in an advisory capacity on this project.
                  </p>
                </div>
              </div>
              <div className='person'>
                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Jeremy Friesen </Heading>
                    <em>Digital Library Technologies Unit Manager
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Jeremy manages a team of software developers that work on this grant and other projects which include supporting The University&apos;s institutional repository services. His role on the grant is managing the vision  and overseeing the technology aspects of the cross-functional project.
                  </p>
                </div>
              </div>
              <div className='person'>
                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Rick Johnson </Heading>
                    <em>Program Director, Digital Initiatives and Scholarship
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Rick provides strategic direction for the design and development of the Hesburgh Libraries&apos; digital library technologies including digital repository services, frameworks, and related digital library applications. As a grant project co-sponsor, Rick supports project needs, tracks and monitors progress, aids partner communication, and identifies resources, as needed, for the grant.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Victoria Perdomo </Heading>
                    <em>Registrar
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          As Registrar, Victoria is responsible for the maintenance and care of the museum’s collection. She maintains all records pertaining to the permanent collection, facilitates object-based research, and oversees the museum’s acquisition, exhibition, and loan programs. Victoria serves as a project co-sponsor by facilitating data extraction from the museum’s database and advising the core team.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Abigail Shelton </Heading>
                    <em>Outreach Specialist
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Abigail is the Outreach Specialist for the project and serves in one of the two grant-funded positions. She is responsible for coordinating and managing user input and feedback from a broad group of stakeholders across the University to ensure that designs meet stakeholder needs.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Miranda VanNevel </Heading>
                    <em>Project Manager
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Miranda joined the Hesburgh Libraries in 2014. She holds a masters in Project Management and is a certified PMP. As such, she oversees the management of strategic projects in the Digital Access, Resources, and Information Technology division. Miranda acts the project manager for the grant.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Zheng Wang </Heading>
                    <em>Associate University Librarian, Digital Access, Resources and IT<br />Interim Director, Navari Family Center for Digital Scholarship
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          As Associate University Librarian, John oversees three programs: Information Technology and Discovery Services, Resource Acquisitions and Delivery Services, and Digital Initiatives and Scholarship. He provides leadership for the development and optimization of library digital, technical, and delivery services. He has published and lectured in the areas of web services and analytics, digital library development, project management, collection supply chain management, and digital scholarship. John serves as a co-sponsor on the grant project.
                  </p>
                </div>
              </div>
            </section>

            <section id='dev' data-magellan-target='dev'>
              <Heading as='h2' variant='styles.h2'>Development</Heading>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Ian Alford </Heading>
                    <em>Manager, Enterprise Systems Unit<br />Hesburgh Libraries
                    </em>
                  </p>
                  <p>
                          Within the Hesburgh Libraries, Ian manages the team responsible for infrastructure, testing, and deployment functions. His contributions to this project include infrastructure-as-code, policy and security reviews, and capacity coordination.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Ryan Doughty </Heading>
                    <em>Senior Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          As a grant team member, Ryan is primarily responsible for developing back-end processing that supplies data represented by IIIF (International Image Interoperability Framework) manifests along with multi-resolution image files for display in the website. His duties at Hesburgh Libraries include software development for both back-end and user-facing components, application and data integration, as well as consultation.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Rob Fox </Heading>
                    <em>Manager, Web and Software Engineering<br />Hesburgh Libraries
                    </em>
                  </p>
                  <p>
                          Rob has been writing web-based software since 1998 and has contributed to software development for the Hesburgh Libraries since 2002. He has worked on several open source projects at Notre Dame and has enjoyed expanding library and museum services within the digital realm. Rob currently manages the Web Software Engineering Team who make significant contributions to digital library services for Notre Dame.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Justin Gondron </Heading>
                    <em>Senior Systems Administrator
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          As a Senior Systems Administrator, Justin provides core systems infrastructure management and server-based programming support for the Hesburgh Libraries. He administers a wide variety of commercially licensed and open source technologies, and is responsible for the configuration, management, function, availability, and security for these systems. He contributes to the grant project in the areas of systems architecture and deployment automation.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Jon Hartzler </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Jon Hartzler is a software lead at the Hesburgh Libraries. He has been at Notre Dame for six years and has been developing software for twenty. For this project, Jon is taking the lead on implementing the IIIF (International Image Interoperability Framework) back-end as well as many of the front-facing web components. He also serves on the Metadata Team.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Steve Mattison </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Steve Mattison is a Lead Software Engineer in the Digital Library Technology Unit. His team develops solutions for digital workflows, preservation, and discovery of collections and research data at Hesburgh Libraries. On the grant project, Steve is taking a lead role in extracting and mapping museum and library data into the search index.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Jonathan Miller </Heading>
                    <em>Senior Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Jonathan was hired by Hesburgh Libraries in April 2018 to serve as a developer in one of the two grant-funded positions. His primary focus is developing the website front-end and its connections to the various sources.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Rinda Mangu </Heading>
                    <em>QA Developer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Rinda is responsible for software quality assurance for Hesburgh Libraries. She develops and maintains test plans and scripts to ensure changes are made in accordance with community requirements. On this grant project, Rinda will test the user interface framework, identify red flags, and make sure issues are addressed before the platform is rolled out to stakeholders.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Dan Wolfe </Heading>
                    <em>Senior Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>As a software engineer for the Web Software Engineering Unit, Dan is responsible for a wide variety of tasks. His primary duties include software development, user interface design and implementation, application and data integration, as well as consultation.
                  </p>
                </div>
              </div>

              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Andy Wetherill </Heading>
                    <em>Web Developer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Andy joined the Hesburgh Libraries as the web developer and graphic designer in 2012. His responsibilities on the grant project include designing website displays and interfaces as well as creating integrated marketing communications materials to promote the project to campus stakeholders and beyond.
                  </p>
                </div>
              </div>

            </section>

            <section id='cont' data-magellan-target='cont'>
              <Heading as='h2' variant='styles.h2'>Content</Heading>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Hanna Bertoldi </Heading>
                    <em>Collections Database Coordinator
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Hanna oversees the museum collections management database, EmbARK, and develops and implements strategies for data cleanup. She leads the Metadata Team and participates in the Workflow and Content Teams.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Rachel Bohlmann </Heading>
                    <em>American History Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Rachel Bohlmann is the subject specialist at Hesburgh Libraries for American history, American Studies, Gender Studies, and journalism. She provides library instruction and manages the collections and resources for these departments. For this project, Rachel serves on the Content Team.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Elizabeth Hogan </Heading>
                    <em>Photograph Archivist
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Elizabeth Hogan manages the analog and digital photograph collections in the University Archives. She assists patrons in accessing the collection and supports many outreach initiatives for the Archives. For the grant project, Elizabeth serves on the Content Team.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Erika Hosselkus </Heading>
                    <em>Special Collections Curator<br />Latin American Studies Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Erika is a special collections curator and subject specialist for Latin American Studies. She teaches with rare materials, curates exhibits, and acquires collections related to Latin American history and culture. She leads the Content Team for the grant.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Steve Mattison </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Steve Mattison is a Lead Software Engineer in the Digital Library Technology Unit. His team develops solutions for digital workflows, preservation, and discovery of collections and research data at Hesburgh Libraries. On the grant project, Steve is taking a lead role in extracting and mapping museum and library data into the search index.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Cheryl Snay </Heading>
                    <em>Curator of European Art<br />Snite Museum of Art
                    </em>
                  </p>
                  <p>
                          As a curator, Cheryl is responsible for building the University&apos;s art collection. As a part of this role, she researches, interprets, and cares for the overall collection, making holdings available for students, faculty, scholars, and the community. Throughout this project, Cheryl offers the team input from the researcher&apos;s perspective to guide content development and user experience.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Marsha Stevenson </Heading>
                    <em>Visual Arts Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Marsha is a member of the Hesburgh Libraries faculty and oversees reference and collection development for the Department of Art, Art History, and Design. In addition, she works closely with the curators and general staff at the Snite Museum of Art. Marsha serves on the Content Team.
                  </p>
                </div>
              </div>

              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Sara Weber </Heading>
                    <em>Special Collections Digital Project Specialist
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Sara works in Rare Books and Special Collections (RBSC) to digitize rare materials for research, publishing, and online use. In addition, she maintains the RBSC website, offers on-site tech support, provides graphic design, and consults on initiatives that involve RBSC content. ​Sara is a primary liaison from RBSC ​for this grant project.
                  </p>
                </div>
              </div>

            </section>

            <section id='meta' data-magellan-target='meta'>
              <Heading as='h2' variant='styles.h2'>Metadata</Heading>

              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Hanna Bertoldi </Heading>
                    <em>Collections Database Coordinator
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Hanna oversees the museum collections management database, EmbARK, including developing and implementing strategies for data cleanup. She leads the Metadata Team and participates in the Workflow and Content Teams.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Peggy Griesinger </Heading>
                    <em>Metadata Technologies Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Peggy serves as the Metadata Technologies Librarian in the Resource Description &amp; Discovery Services Unit of the Hesburgh Libraries. Her responsibilities include the creation, analysis, enrichment, and transformation of MARC and non-MARC metadata. Her role in the grant project involves analyzing, transforming, and cross-walking metadata to ensure interoperability across multiple data sources.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Jon Hartzler </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Jon Hartzler is a software lead at the Hesburgh Libraries. He has been at Notre Dame for six years and has been developing software for twenty. For this project, Jon is taking the lead on implementing the IIIF (International Image Interoperability Framework) back-end as well as many of the front-facing web components. He also serves on the Metadata Team.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Steve Mattison </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Steve Mattison is a Lead Software Engineer in the Digital Library Technology Unit. His team develops solutions for digital workflows, preservation, and discovery of collections and research data at Hesburgh Libraries. On the grant project, Steve is taking a lead role in extracting and mapping museum and library data into the search index.
                  </p>
                </div>
              </div>

            </section>

            <section id='work' data-magellan-target='work'>
              <Heading as='h2' variant='styles.h2'>Workflow</Heading>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Hanna Bertoldi </Heading>
                    <em>Collections Database Coordinator
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Hanna oversees the museum collections management database, EmbARK, and develops and implements strategies for data cleanup. She leads the Metadata Team and participates in the Workflow and Content teams.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Patricia Lawton </Heading>
                    <em>Special Projects Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          As Special Projects Librarian, Pat recently served as Team Lead on the Digital Collections Workflow Team whose charge was to establish workflows for digital collections across library units.  She currently serves as Team Lead for the grant&apos;s Workflow Team to establish joint workflows for Rare Books and Special Collections, University Archives, and Snite Museum. Pat has presented and published widely on collaborative and digital initiatives, with a special focus on ensuring the survival and discovery of religious archives.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Steve Mattison </Heading>
                    <em>Lead Software Engineer
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          Steve Mattison is a Lead Software Engineer in the Digital Library Technology Unit. His team develops solutions for digital workflows, preservation, and discovery of collections and research data at Hesburgh Libraries. On the grant project, Steve is taking a lead role in extracting and mapping museum and library data into the search index.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Mikala Narlock </Heading>
                    <em>Digital Collections Librarian
                      <br />Hesburgh Libraries</em>
                  </p>
                  <p>
                          As the Digital Collections Librarian, Mikala is responsible for managing digital content and distributing items to various repositories. On the grant project, Mikala is a member of the Workflow Team charged with analyzing how content will be uploaded to the unified platform.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Michael Rippy </Heading>
                    <em>Digital and Special Projects Program Manager
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Mike develops and manages digital and special projects in concert with the museum directors and museum curators at the Snite Museum of Art. He works to engage local, regional, and national audiences, raise awareness of museum collections, exhibitions, and programs, and elevate new projects supporting working artists through a variety of digital and real-world outcomes. On this project, Mike serves on the Workflow Team and works with software developers on the museum&apos;s digital assets.
                  </p>
                </div>
              </div>
              <div className='person'>

                <div className='detail'>
                  <p className='name'>
                    <Heading as='h3' variant='styles.h3'>Abigail Shelton </Heading>
                    <em>Outreach Specialist
                      <br />Snite Museum of Art</em>
                  </p>
                  <p>
                          Abigail is the Outreach Specialist for the project and serves in one of the two grant-funded positions. She is responsible for coordinating and managing user input and feedback from a broad group of stakeholders across the University to ensure that designs meet stakeholder needs.
                  </p>
                </div>
              </div>

            </section>
          </div>
        </NDBrandSection>

      </NDBrandSectionLeftNav>
    </Layout>

  )
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
export default Page

export const query = graphql`
  query {
    menusJson(id: {eq: "help"}) {
      id
      label
      items {
        id
        label
        link
        icon
        selectedPatterns
      }
    }
  }
`

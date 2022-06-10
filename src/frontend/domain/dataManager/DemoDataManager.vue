<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import * as cardClient from '@/domain/dataManager/services/cardClient'
import * as blockClient from '@/domain/dataManager/services/blockClient'

export default defineComponent({
  name: 'DemoDataManager',
  setup() {
    const topic = {
      id: '867907c9-018a-44b6-961d-a272dd91b425',
      title: 'Become a Miljn frontend developer',
      meta: {
        priority: 1,
        progress: 'in_progress',
      },
      blocks: [
        {
          id: 'c24d5842-f7f0-4af0-8ad6-ad999a079da0',
          typeId: '25fe4020-6b5e-4774-b753-82a8b6f018f1',
          payload: {
            value: 'Oh hello',
            level: 1,
          },
        },
        {
          id: '698849c3-9452-4df5-97de-41da230f733d',
          typeId: '694b10c6-2f99-4b1d-aafd-5c54900b0cf8',
          payload: {
            value: 'all this',
          },
        },
        {
          id: 'ac116d4b-0e7b-468a-8e4b-3b277bc68f72',
          typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
          payload: {
            value: 'http:\/\/www.miljn.com',
          },
        },
        {
          id: 'aaee14b5-924a-41fe-8e1a-8d3ba75a3d6f',
          typeId: '694b10c6-2f99-4b1d-aafd-5c54900b0cf8',
          payload: {
            value: 'jhjh',
          },
        },
        {
          id: 'a4cbd516-4298-4dab-892b-40a8269a5c9f',
          typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
          payload: {
            value:
              'https:\/\/medium.com\/@roman.dobrik_82860\/developing-enterprise-applications-with-the-internet-computer-using-java-agent-70b08f4d5300',
          },
        },
        {
          id: 'b5e7a802-f2ab-4cc3-ac08-4445e1bedc7a',
          typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
          payload: {
            value: 'https:\/\/michaelnthiessen.com\/reusable-components',
          },
        },
      ],
      children: [
        {
          id: 'becc96f6-3686-4e10-aea4-b2b12612755e',
          title: 'Getting Started',
          meta: {
            priority: 0,
            progress: 'in_progress',
          },
          blocks: [
            {
              id: '52a46204-fbdb-4488-85bb-30079a69848a',
              typeId: '694b10c6-2f99-4b1d-aafd-5c54900b0cf8',
              payload: {
                value: 'asasa',
              },
            },
          ],
          children: [
            {
              id: '53dc0241-f889-4660-b736-a09a7e0e592c',
              title: 'Learn Git Branching',
              meta: {
                priority: 0,
                progress: '"open"',
              },
              blocks: [
                {
                  id: 'c382baf1-5c64-4341-a384-135cef292ba0',
                  typeId: '25fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'Headline',
                    level: 2,
                  },
                },
                {
                  id: 'fb648817-1248-4e0c-8583-152439c9edf4',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/learngitbranching.js.org\/?locale=en_US',
                  },
                },
                {
                  id: 'a611c030-940f-4724-a161-79e7a54deda6',
                  typeId: '694b10c6-2f99-4b1d-aafd-5c54900b0cf8',
                  payload: {
                    value: 'Notices',
                  },
                },
              ],
              children: [],
            },
            {
              id: '02a9e81c-8c5e-41be-9f12-a516de4b91d4',
              title: 'Oh My Git!',
              meta: {
                priority: 1,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: 'f6da9e24-6bc5-44ba-8173-0a11f1c779b6',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/ohmygit.org\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '3dffebea-d762-447b-87f6-d093eefb3b78',
              title: 'Getting Started | Markdown Guide',
              meta: {
                priority: 1,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: 'c3ba5df9-cfce-49e9-b908-f439020f12f3',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/www.markdownguide.org\/getting-started\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '50886f8b-3a2c-44df-a8f4-3bb8fab4bfd1',
              title:
                'YAML Tutorial: Everything You Need to Get Started in Minutes | Cloudbees Blog',
              meta: {
                priority: 1,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '663b4f22-acce-4e48-8598-269a997f5aad',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/www.cloudbees.com\/blog\/yaml-tutorial-everything-you-need-get-started',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'c6dfbed2-420a-4a3a-b247-cf67cd91fd27',
              title: 'Working with JSON - Learn web development | MDN',
              meta: {
                priority: 3,
                progress: '"in_progress"',
              },
              blocks: [
                {
                  id: '313651b8-96c0-4811-b630-b59096d8cf5d',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/developer.mozilla.org\/en-US\/docs\/Learn\/JavaScript\/Objects\/JSON',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'a2582239-49a5-42d2-884f-ba4f1b1d1a8a',
              title: 'Tailwind CSS: From Zero to Production',
              meta: {
                priority: 0,
                progress: '"in_progress"',
              },
              blocks: [
                {
                  id: '4c8df1b6-3a38-4fab-89de-18a884490cd2',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/youtube.com\/playlist?list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0',
                  },
                },
              ],
              children: [],
            },
            {
              id: '2f42da93-fcc3-4f27-89bc-0fd86a02b2bd',
              title: 'Knights of the Flexbox table',
              meta: {
                priority: 0,
                progress: '"in_progress"',
              },
              blocks: [
                {
                  id: '82e9245c-bd49-4ac7-b6a8-20ff60624de2',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/knightsoftheflexboxtable.com\/',
                  },
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: '82b5d807-574e-4bcb-8a26-8bec55b922ab',
          title: 'Getting real',
          meta: {
            priority: 1,
            progress: '"open"',
          },
          blocks: [],
          children: [
            {
              id: '623f8d7a-830f-419d-8864-0cac9ccb414a',
              title: 'Eloquent JavaScript',
              meta: {
                priority: 3,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: '3e6fd313-1b49-45ef-8715-d15c0166f2da',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/eloquentjavascript.net\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'e9aaf4f1-d969-4254-84ff-33e45faf932c',
              title: 'Reactivity Fundamentals | Vue.js',
              meta: {
                priority: 1,
                progress: '"in_progress"',
              },
              blocks: [
                {
                  id: '0b48254a-f99f-4342-bced-511c07278328',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vuejs.org\/guide\/essentials\/reactivity-fundamentals.html#script-setup',
                  },
                },
              ],
              children: [],
            },
            {
              id: '0de6de92-9261-4ccf-9571-998690fc9482',
              title: 'The Vue.js 3 Masterclass',
              meta: {
                priority: 1,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '2bdffb05-318f-4e50-87fa-83ebe7e4d63c',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/vueschool.io\/courses\/the-vuejs-3-master-class',
                  },
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: '9d7998cc-a763-471f-9b48-d8b5775678ef',
          title: 'Deep dive',
          meta: {
            priority: 0,
            progress: '"in_progress"',
          },
          blocks: [],
          children: [
            {
              id: 'c86d13a8-faf6-4ea9-8c59-b538e89751aa',
              title: 'Clean Components - Michael Thiessen',
              meta: {
                priority: 1,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: '6c38988c-7d6d-48c6-94d5-3a5de430ae45',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/michaelnthiessen.com\/clean-components',
                  },
                },
              ],
              children: [],
            },
            {
              id: '59879e9b-d04e-499c-abeb-766605dfa565',
              title: 'Reusable Components - Michael Thiessen',
              meta: {
                priority: 1,
                progress: '"open"',
              },
              blocks: [
                {
                  id: 'd1da2e65-3985-4959-bf9c-f78033f80dd3',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/michaelnthiessen.com\/reusable-components',
                  },
                },
              ],
              children: [],
            },
            {
              id: '83a28c64-d950-4d2d-a06f-7c5d928c8a17',
              title: 'Learn How to Test your JavaScript with Jest in This Video Course',
              meta: {
                priority: 1,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '463ec53b-0129-46a5-bfc7-1cd309d86545',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/vueschool.io\/courses\/test-with-jest',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'ff2f6e20-2dce-4c0d-8a14-076d78145992',
              title: 'Abstracting your dependencies - Vue.js Tutorials',
              meta: {
                priority: 2,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '27aa452c-19ba-4867-af43-a0007bf08c0c',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vueschool.io\/articles\/vuejs-tutorials\/abstracting-your-dependencies\/',
                  },
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: '5ea1b069-882c-4ac6-bb95-46bbc269e331',
          title: 'Consider frontend architecture',
          meta: {
            priority: 2,
            progress: '"in_progress"',
          },
          blocks: [],
          children: [
            {
              id: '825599ba-96d7-4a05-8959-370bbcdba34b',
              title: 'Domain-Driven Design in Vue.js - Vue.js Tutorials',
              meta: {
                priority: 2,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: '2256632d-ec6b-4699-9a3f-da98e9d9157f',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vueschool.io\/articles\/vuejs-tutorials\/domain-driven-design-in-vue-js\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '27e715be-bfe0-4c95-bb53-454d100fb635',
              title: 'The C4 model for visualising software architecture',
              meta: {
                priority: 3,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: '4ae9d8ce-e71f-4426-8fe9-1d9f260b7a93',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/c4model.com\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '600b58e3-2de9-4029-97a5-698225cfa176',
              title: 'Architectural Decision Records | adr.github.io',
              meta: {
                priority: 0,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '72a054f4-064e-4594-b242-ae9548462048',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/adr.github.io\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'bebeb18e-63fa-4c38-b6df-d53aad1c9fe5',
              title: 'Pinia: The Enjoyable Vue Store',
              meta: {
                priority: 1,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: 'ecfd46a3-22b5-4ad4-8069-48d9ac394317',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vueschool.io\/courses\/pinia-the-enjoyable-vue-store',
                  },
                },
              ],
              children: [],
            },
            {
              id: '031e6511-ca2f-4b88-9a84-73490bb0cff9',
              title: 'Pinia, an Alternative Vue.js Store - Vue.js Tutorials',
              meta: {
                priority: 3,
                progress: '"in_progress"',
              },
              blocks: [
                {
                  id: 'c1911f86-3bf5-454c-85b1-c9f283613d5e',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vueschool.io\/articles\/vuejs-tutorials\/pinia-an-alternative-vue-js-store\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '6dd156cd-9515-44d5-871a-a654ab463dd6',
              title: 'Data fetching and caching with SWR and Vue.js | Vue Mastery',
              meta: {
                priority: 3,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '067a9185-fcc1-490a-9a83-d0d35561a098',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/www.vuemastery.com\/blog\/data-fetching-and-caching-with-swr-and-vuejs\/',
                  },
                },
              ],
              children: [],
            },
            {
              id: '16d5a363-c624-4600-ba1d-9ca76995f015',
              title:
                'Architecting HTTP clients in Vue.js applications for efficient network communication | Haxzie | Musthaq Ahamad',
              meta: {
                priority: 2,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '66adf23a-d709-4df0-b222-8427648b5369',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/haxzie.com\/architecting-http-clients-vue-js-network-layer',
                  },
                },
              ],
              children: [],
            },
            {
              id: '11cf98e2-cc77-4d64-a775-944e00e7d935',
              title: 'VueUse for Everyone',
              meta: {
                priority: 3,
                progress: '"closed"',
              },
              blocks: [
                {
                  id: 'e8ce8a97-e227-4816-a9ba-eacd53dd138c',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/vueschool.io\/courses\/vueuse-for-everyone',
                  },
                },
              ],
              children: [],
            },
            {
              id: '4c781647-6d5b-4b97-bd87-dccb46c60fd4',
              title: 'Application Monitoring in Vue.js with Sentry',
              meta: {
                priority: 2,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '3f6500e3-04a1-4959-b139-b0e14d369162',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/vueschool.io\/courses\/application-monitoring-in-vue-js-with-sentry',
                  },
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: '3ad60aae-7906-4bd4-a6d3-5a5f8ea7de3d',
          title: 'Going even further',
          meta: {
            priority: 2,
            progress: '"in_progress"',
          },
          blocks: [],
          children: [
            {
              id: '1a20f16f-b17f-4f4a-b170-bf306de4779b',
              title: '7 ways to make your view unit tests better',
              meta: {
                priority: 3,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '119d13e4-4d7b-405f-9d82-217bc6fc3197',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/youtube.com\/watch?v=L_BK8zXGdBM&feature=share',
                  },
                },
              ],
              children: [],
            },
            {
              id: 'cca86a86-dd71-48fd-96c9-82ff8c2a9332',
              title: 'Laracasts: Be Awesome in PHPStorm',
              meta: {
                priority: 3,
                progress: '"open"',
              },
              blocks: [
                {
                  id: 'ba4400fb-b474-4f0e-a610-c52291d674f2',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value:
                      'https:\/\/laracasts.com\/series\/how-to-be-awesome-in-phpstorm',
                  },
                },
              ],
              children: [],
            },
            {
              id: '41564fd0-61da-4d41-baf7-33dd60f891ae',
              title: 'Rapid Development with Vite Video Course',
              meta: {
                priority: 1,
                progress: '"open"',
              },
              blocks: [
                {
                  id: '7a0c2cbe-43aa-40f0-adc8-ba29fb311793',
                  typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
                  payload: {
                    value: 'https:\/\/vueschool.io\/courses\/rapid-development-with-vite',
                  },
                },
              ],
              children: [],
            },
          ],
        },
      ],
    }

    const mapCard = (card) => {
      return {
        id: card.id,
        title: card.title,
        meta: card.meta,
        blocks: card.blocks.map((block) => block.id),
        children: card.children.map((card) => card.id),
      }
    }

    const mapBlock = (block) => block

    const flattenCard = (card) => {
      let list = [mapCard(card)]
      for (let i in card.children) {
        list = list.concat(flattenCard(card.children[i]))
      }

      return list
    }

    const extractBlocks = (card) => {
      let list = [...card.blocks.map(mapBlock)]
      for (let i in card.children) {
        list = list.concat(extractBlocks(card.children[i]))
      }

      return list
    }

    window._cards = flattenCard(topic)
    window._blocks = extractBlocks(topic)

    window._topic = topic

    window._cC = cardClient
    window._bC = blockClient


    const resolveBlock = id => {
      return blockClient.find(id)
    }

    const resolveCard = async id => {
      const card = await cardClient.find(id)
      card.children = await Promise.all(card.children.map(resolveCard))
      card.blocks = await Promise.all(card.blocks.map(resolveBlock))
      return card
    }

    window._resolveCard = resolveCard
  },
})
</script>

<style scoped></style>

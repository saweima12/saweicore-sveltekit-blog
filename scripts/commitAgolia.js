import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { classifiedSet } from 'markedpage';

dotenv.config();

const getFormatedDate = (dateStr) => {
	let dateObj = new Date(dateStr);
	let month = dateObj.getMonth() + 1;
	let day = dateObj.getDate();
	return {
		year: String(dateObj.getFullYear()),
		month: month < 10 ? `0${month}` : String(month),
		day: day < 10 ? `0${day}` : String(day)
	};
}

const getPostLink = (page) => {
  let dateObj = getFormatedDate(page.frontMatter.created)
  return `/posts/${dateObj.year}/${dateObj.month}/${page.slugKey}`;
};

const postSet = await classifiedSet("post");
const pages = postSet.pages;

// Define json struct for Algolia
const result = pages.map(page => {
  const metadata = page.frontMatter;
  let headings = page.headings || [];
  headings = headings.map(heading => ({text: heading.text, id:heading.id}))

  return {
    title: metadata.title,
    tags: metadata.tags,
    headings: headings,
    permalink: getPostLink(page),
    objectID: page.indexPath
  };
});


// Loading
const conn = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_ADMINKEY);
const index = conn.initIndex("SaweicoreLab");

await index.clearObjects()
let response = await index.saveObjects(result);
console.log(response.objectIDs);
// console.log(JSON.stringify(result));

import * as React from 'react';
import { useDispatch } from 'react-redux';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { reloadDetailedItem } from '@craftercms/studio-ui/state/actions/content';
import { showEditItemSuccessNotification } from '@craftercms/studio-ui/state/actions/system';
import { fetchSandboxItem } from '@craftercms/studio-ui/services/content';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { getContentTypeDefinition, writeContent } from '../api/studio';

const steps = [
  'What is the subject of the article?',
  'Who is the reader of the the article?',
  'Generating...'
];

export default function QuickCreateContentDialog(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(['', '']);

  console.log(props);
  const { contentTypeId, path } = props;

  const { authoringBase } = useEnv();
  const siteId = useActiveSiteId();
  const dispatch = useDispatch();

  const handleNext = async (currentStep) => {
    if (currentStep === steps.length - 1) {
      const today = new Date();
      const formatPath = path
        .replace('{year}', `${today.getFullYear()}`)
        .replace('{month}', ('0' + (today.getMonth() + 1)).slice(-2));

        const folderName = 'Curabitur lobortis laoreet vehicula'.toLowerCase().replace(/\s/g, '-');
        const contentPath = `${formatPath}/${folderName}`;

        const body = await buildContent({ authoringBase, siteId, contentTypeId });

        const res = await writeContent(authoringBase, siteId, contentPath, 'index.xml', contentTypeId, body);
        if (res) {
          fetchSandboxItem(siteId, contentPath, { castAsDetailedItem: true }).subscribe({
            next(sandboxItem) {
              dispatch(
                showEditDialog({
                  site: siteId,
                  path: sandboxItem.path,
                  authoringBase: authoringBase,
                  onSaveSuccess: batchActions([showEditItemSuccessNotification(), reloadDetailedItem({ path: sandboxItem.path })])
                })
              );
            },
            error() {
              console.error("Oops! We can't find the content you are looking for.");
            }
          });
        }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onAnswer = (answer, step) => {
    answers[step] = answer;
    setAnswers([...answers]);
  }

  const buildContent = async ({ authoringBase, siteId, contentTypeId }) => {
    const config = await getContentTypeDefinition(authoringBase, siteId, contentTypeId);
    const configXmlDoc = (new DOMParser()).parseFromString(config, 'text/xml');
    const xpath = '/form/sections/section/fields/field';
    const result = configXmlDoc.evaluate(xpath, configXmlDoc, null, XPathResult.ANY_TYPE, null);
    const fields = [];
    let node = result.iterateNext() as Element;
    while (node) {
      const fieldType = node.getElementsByTagName('type')[0].textContent;
      const fieldId = node.getElementsByTagName('id')[0].textContent;
      if (fieldType === 'input' || fieldType === 'textarea') {
        fields.push({ fieldType, fieldId });
      }
      node = result.iterateNext() as Element;
    }

    // build new content
    const contentXmlDoc = (new DOMParser()).parseFromString('<page></page>', 'text/xml');
    const contentTypeElement = contentXmlDoc.createElement('content-type');
    contentTypeElement.textContent = contentTypeId;
    contentXmlDoc.documentElement.appendChild(contentTypeElement);

    const displayTemplate = configXmlDoc.evaluate('/form/properties/property[name="display-template"]',
                            configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const displayTemplateElement = contentXmlDoc.createElement('display-template');
    displayTemplateElement.textContent = displayTemplate ? displayTemplate.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(displayTemplateElement);

    const noTemplateRequired = configXmlDoc.evaluate('/form/properties/property[name="no-template-required"]',
                                configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const noTemplateRequiredElement = contentXmlDoc.createElement('no-template-required');
    noTemplateRequiredElement.textContent = noTemplateRequired ? noTemplateRequired.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(noTemplateRequiredElement);

    const mergeStrategy = configXmlDoc.evaluate('/form/properties/property[name="merge-strategy"]',
                            configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const mergeStrategyElement = contentXmlDoc.createElement('merge-strategy');
    mergeStrategyElement.textContent = mergeStrategy ? mergeStrategy.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(mergeStrategyElement);

    const objectId = crypto.randomUUID();
    const objectGroupIdElement = contentXmlDoc.createElement('objectGroupId');
    objectGroupIdElement.textContent = objectId.substring(0, 4);
    contentXmlDoc.documentElement.appendChild(objectGroupIdElement);

    const objectIdElement = contentXmlDoc.createElement('objectId');
    objectIdElement.textContent = objectId;
    contentXmlDoc.documentElement.appendChild(objectIdElement);

    const fileNameElement = contentXmlDoc.createElement('file-name');
    fileNameElement.textContent = 'index.xml';
    contentXmlDoc.documentElement.appendChild(fileNameElement);

    const folderNameElement = contentXmlDoc.createElement('folder-name');
    // TODO: Get from Open AI
    folderNameElement.textContent = 'Curabitur lobortis laoreet vehicula'.toLowerCase().replace(/\s/g, '-');
    contentXmlDoc.documentElement.appendChild(folderNameElement);

    for (let field of fields) {
      const { fieldId } = field;
      const fieldElement = contentXmlDoc.createElement(fieldId);
      // TODO: get from Open AI
      fieldElement.textContent = 'Curabitur lobortis laoreet vehicula';
      contentXmlDoc.documentElement.appendChild(fieldElement);
    }

    const date = new Date();
    const isoString = date.toISOString();

    const createdDateElement = contentXmlDoc.createElement('createdDate');
    createdDateElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(createdDateElement);

    const createdDateDtElement = contentXmlDoc.createElement('createdDate_dt');
    createdDateDtElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(createdDateDtElement);

    const lastModifiedDateElement = contentXmlDoc.createElement('lastModifiedDate');
    lastModifiedDateElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(lastModifiedDateElement);

    const lastModifiedDateDtElement = contentXmlDoc.createElement('lastModifiedDate_dt');
    lastModifiedDateDtElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(lastModifiedDateDtElement);

    const content = (new XMLSerializer()).serializeToString(contentXmlDoc);
    console.log(content);

    return content;
  };

  return (
    <>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - your answers are:
                {
                  answers.map((answer) => {
                    return (
                      <>
                        <Typography>{answer}</Typography>
                      </>
                    );
                  })
                }
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '45px auto'
                }}
              >
                <TextField
                  id="step-answer"
                  label="Your answer"
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={answers[activeStep]}
                  fullWidth
                  sx={{
                    width: '100%',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onAnswer(event.target.value, activeStep);
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={() => handleNext(activeStep)}>
                  {activeStep === steps.length - 1 ? 'Generate Content' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </DialogContent>
    </>
  );
};
